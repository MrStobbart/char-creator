import { NumberProperty, TextProperty, CharProperty, CharData, Property } from './interfaces';
import * as shortid from 'shortid';
import { Modifier, FieldGroup, Edge, Hinderance, Requirement, DeliveredData } from './interfaces';
import { Skill } from './Skill';
import { Attribute } from './Attribute';
import { Qualities } from './Qualities';
import {
  deliveredDataFieldset,
  attributesFieldset,
  skillsFieldset,
  generalInformationFieldset,
  qualitiesFieldset,
  calculateSkillPoints,
} from './characterData';

export default class SavageWorldsCharacter {
  // Index signature for dynamic property access
  [key: string]: Property | any;
  [key: number]: undefined;

  public constructor(charProperties?: CharData) {
    if (charProperties) {
      this.loadJson(charProperties);
    }

    this.init();
  }

  // initial calculation
  protected init = () => {
    this.calcAvailableSkillPoints();
    this.calcAvailableAttributePoints();
    this.calcDeliveredData();
  };

  protected loadJson = (charProperties: CharData) => {
    console.log('load json', charProperties);

    // TODO edges / hinderances not loaded properly
    this.id = charProperties._id;
    charProperties.data.forEach(charProperty => {
      if (this[charProperty.id]) {
        this[charProperty.id].value = charProperty.value;
      } else {
        console.error(`Property ${charProperty.id} not found.`);
      }
    });
    console.log('Name is ' + this.name);
  };

  public getJson(): CharData {
    // TODO edges / hinderances not saved properly
    // All char properties that should be saved (not delivered data)
    const charPropsFlat = this.fieldsets.reduce((sum: string[], current) => {
      if (current.id === 'deliveredData') {
        return sum;
      }
      return sum.concat(current.order);
    }, []);
    // Saveable char property object (JsonProperty)
    const charPropsForDb: CharProperty[] = charPropsFlat.map(propertyId => {
      const propertyValue: number | string = this[propertyId].value;
      return {
        id: propertyId,
        value: propertyValue,
      };
    });
    // Remove Empty elements
    const charPropsForDbNotEmpty = charPropsForDb.filter(charProp => {
      if (charProp.value === '' || charProp.value === 0) {
        return false;
      }
      throw new Error();
    });
    return {
      _id: this.id,
      data: charPropsForDbNotEmpty,
    };
  }
  /**
   * This function calculates the remaining skill and attribute points and applies modifiers when parameter set to true.
   * @param modifiersChanged Lets the function know if the modifiers should be re calculated
   */

  protected skillSideEffects = (effectsSkillPoints = false) => {
    this.calcDeliveredData();
    if (effectsSkillPoints) this.calcAvailableSkillPoints();
  };

  protected attributeSideEffects = (effectsAttributePoints = false) => {
    this.calcDeliveredData();
    if (effectsAttributePoints) this.calcAvailableAttributePoints();
  };

  protected qualitiesSideEffects = () => {
    this.calculateQualityPoints();
    this.calcDeliveredData();
  };

  protected calcDeliveredData = () => {
    const modifiers = this.getAllModifiers();

    const parryModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'parry' ? sum + modifier.value : sum),
      0,
    );
    const toughnessModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'toughness' ? sum + modifier.value : sum),
      0,
    );
    const paceModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'pace' ? sum + modifier.value : sum),
      0,
    );
    const charismaModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'charisma' ? sum + modifier.value : sum),
      0,
    );

    this.parry.value = (this.fighting.value * 2 + 2) / 2 + 2 + parryModifer;
    this.toughness.value = (this.vigor.value * 2 + 2) / 2 + 2 + toughnessModifer;
    this.pace.value = this.basePace + paceModifer;
    this.charisma.value = this.baseCharisma + charismaModifer;
  };

  // TODO Remove modifier again while calculating skillpoints?
  protected calcAvailableSkillPoints = () => {
    this.skillPoints.value = this.skills.order.reduce((sum, skillName) => {
      const skill: Skill = this[skillName];
      const attribute = this[skill.attribute];
      if (skill.calculationType === 'cheapSkill') {
        return sum - calculateSkillPoints(skill.value, attribute.value, 1);
      } else {
        return sum - calculateSkillPoints(skill.value, attribute.value, 2);
      }
    }, 50);
  };

  protected calcAvailableAttributePoints = () => {
    this.attributePoints.value = this.attributes.order.reduce((sum, attribute) => sum - this[attribute].value, 10);
  };

  protected calculateQualityPoints = () => {
    // TODO implement this
  };

  private appliedModifiers: Modifier[] = [];

  protected getAllModifiers = (): Modifier[] => {
    const edgeModifiers = this.edges.getModifiers();
    const hinderanceModifiers = this.hinderances.getModifiers();
    return edgeModifiers.concat(hinderanceModifiers);
  };

  /**
   * @param requirements An array of all requirements that have to be met
   * @returns Either an array of all requirements that were not met that is empy if all were met
   */
  public checkRequirements = (requirements: Requirement[]): Requirement[] => {
    let requirementsFulfilled = true;
    const unmetRequirements = requirements.filter(requirement => {
      if (requirement.value > this[requirement.propertyId].value) {
        requirementsFulfilled = false;
        return true;
      }
      return false;
    });

    return requirementsFulfilled ? [] : unmetRequirements;
  };

  public values = ['W4 - 2', 'W4', 'W6', 'W8', 'W10', 'W12'];

  public charCreationInformation: FieldGroup = {
    id: 'charCreationInformation',
    title: 'Verfügbare Punkte',
    type: 'number',
    order: ['skillPoints', 'attributePoints'],
  };

  public skillPoints: NumberProperty = { id: 'skillPoints', label: 'Fähigkeitspunkte', value: 50 };
  public attributePoints: NumberProperty = { id: 'attributePoints', label: 'Attributspunkte', value: 10 };

  public fieldsets: FieldGroup[] = [
    generalInformationFieldset,
    attributesFieldset,
    deliveredDataFieldset,
    qualitiesFieldset,
    skillsFieldset,
  ];

  // this is a test if this boy actually knows English

  public id: string = shortid.generate();
  public label = 'A';
  public availableLevels: string[] = ['A', 'F', 'V', 'H'];

  public qualities: FieldGroup = qualitiesFieldset;
  // Idea, make a class for each that handles the updates automatically and have another logical group for the renderer. Then only edges.push()
  public edges: Qualities<Edge> = new Qualities<Edge>('edges', 'Talente', this.qualitiesSideEffects);
  public hinderances: Qualities<Hinderance> = new Qualities<Hinderance>(
    'hinderances',
    'Handicaps',
    this.qualitiesSideEffects,
  );

  // General information
  public generalInformation = generalInformationFieldset;
  public name: TextProperty = { id: 'name', label: 'Name', value: '' };
  public family: TextProperty = { id: 'family', label: 'Familie', value: '' };
  public placeOfBirth: TextProperty = { id: 'placeOfBirth', label: 'Geburtsort', value: '' };
  public birthday: TextProperty = { id: 'birthday', label: 'Geburtstag', value: '' };
  public age: TextProperty = { id: 'age', label: 'Alter', value: '' };
  public sex: TextProperty = { id: 'sex', label: 'Geschlecht', value: '' };
  public species: TextProperty = { id: 'species', label: 'Spezie', value: '' };
  public size: TextProperty = { id: 'size', label: 'Größe', value: '' };
  public weight: TextProperty = { id: 'weight', label: 'Gewicht', value: '' };
  public hairColor: TextProperty = { id: 'hairColor', label: 'Haarfarbe', value: '' };
  public eyeColor: TextProperty = { id: 'eyeColor', label: 'Augenfarbe', value: '' };
  public culture: TextProperty = { id: 'culture', label: 'Kultur', value: '' };
  public profession: TextProperty = { id: 'profession', label: 'Profession', value: '' };
  public title: TextProperty = { id: 'title', label: 'Title', value: '' };
  public socialStatus: TextProperty = { id: 'socialStatus', label: 'Sozialstatus', value: '' };
  public characterisitics: TextProperty = { id: 'characterisitics', label: 'Charakteristiken', value: '' };
  public otherInformation: TextProperty = {
    id: 'otherInformation',
    label: 'Ander Informationen',
    value: '',
  };

  // Delivered data
  public deliveredData: FieldGroup = deliveredDataFieldset;
  private baseCharisma = 0;
  private basePace = 0;
  public parry: DeliveredData = { id: 'parry', label: 'Parade', value: 0 };
  public charisma: DeliveredData = { id: 'charisma', label: 'Charisma', value: 0 };
  public toughness: DeliveredData = { id: 'toughness', label: 'Robustheit', value: 0 };
  public pace: DeliveredData = { id: 'pace', label: 'Geschwindigkeit', value: 0 };

  // Attributes
  public attributes: FieldGroup = attributesFieldset;
  public agility: Attribute = new Attribute('agility', 'Geschicklichkeit', this.attributeSideEffects);
  public smarts: Attribute = new Attribute('smarts', 'Verstand', this.attributeSideEffects);
  public spirit: Attribute = new Attribute('spirit', 'Willenskraft', this.attributeSideEffects);
  public vigor: Attribute = new Attribute('vigor', 'Konstitution', this.attributeSideEffects);
  public strength: Attribute = new Attribute('strength', 'Stärke', this.attributeSideEffects);

  // Skills
  public skills: FieldGroup = skillsFieldset;
  // Combat skills
  public fighting: Skill = new Skill('fighting', 'Kämpfen', 'agility', this.skillSideEffects);
  public schooting: Skill = new Skill('schooting', 'Schießen', 'agility', this.skillSideEffects);
  public throwing: Skill = new Skill('throwing', 'Werfen', 'agility', this.skillSideEffects);

  // Body skills
  public fastHands: Skill = new Skill('fastHands', 'Fingerfertigkeit', 'agility', this.skillSideEffects);
  public stealth: Skill = new Skill('stealth', 'Heimlichkeit', 'agility', this.skillSideEffects);
  public climbing: Skill = new Skill('climbing', 'Klettern', 'strength', this.skillSideEffects, true);
  public bodyControl: Skill = new Skill('bodyControl', 'Körperbeherschung', 'agility', this.skillSideEffects);
  public crafting: Skill = new Skill('crafting', 'Handwerk', 'agility', this.skillSideEffects, true); // TODO mehrere Handwerke möglich
  public riding: Skill = new Skill('riding', 'Reiten', 'agility', this.skillSideEffects, true);
  public driving: Skill = new Skill('driving', 'Fahrzeuge', 'agility', this.skillSideEffects, true);
  public lockpicking: Skill = new Skill('lockpicking', 'Schlösserknacken', 'agility', this.skillSideEffects);
  public swimming: Skill = new Skill('swimming', 'Schwimmen', 'strength', this.skillSideEffects, true);
  public perception: Skill = new Skill('perception', 'Wahrnehmen', 'smarts', this.skillSideEffects);

  // Social skills
  public seduction: Skill = new Skill('seduction', 'Betören', 'smarts', this.skillSideEffects, true);
  public intimidation: Skill = new Skill('intimidation', 'Einschüchtern', 'spirit', this.skillSideEffects, true);
  public etiquette: Skill = new Skill('etiquette', 'Etikette', 'smarts', this.skillSideEffects, true);
  public empathy: Skill = new Skill('empathy', 'Menschenkenntnis', 'smarts', this.skillSideEffects);
  public persuade: Skill = new Skill('persuade', 'Überreden', 'smarts', this.skillSideEffects);
  public streetwise: Skill = new Skill('streetwise', 'Umhören', 'smarts', this.skillSideEffects);

  // Nature skills
  public tracking: Skill = new Skill('tracking', 'Fährtensuche', 'smarts', this.skillSideEffects);
  public natureKnowledge: Skill = new Skill('natureKnowledge', 'Naturkunde', 'smarts', this.skillSideEffects);
  public surival: Skill = new Skill('surival', 'Wildnisleben', 'spirit', this.skillSideEffects);

  // Knowledge skills
  public alchemy: Skill = new Skill('alchemy', 'Alchemie', 'smarts', this.skillSideEffects);
  public gambling: Skill = new Skill('gambling', 'Glücksspiel', 'smarts', this.skillSideEffects, true);
  public faith: Skill = new Skill('faith', 'Glaube', 'spirit', this.skillSideEffects); // TODO nur wenn arkaner Hintergrund(Wunder) gewählt wurde
  public healing: Skill = new Skill('healing', 'Heilkunde', 'smarts', this.skillSideEffects);
  public arcaneKnowledge: Skill = new Skill('arcaneKnowledge', 'Magiekunde', 'smarts', this.skillSideEffects);
  public language: Skill = new Skill('language', 'Sprache', 'smarts', this.skillSideEffects, true); // TODO mehrere Sprachen möglich
  public knowledge: Skill = new Skill('knowledge', 'Wissen', 'smarts', this.skillSideEffects, true); // TODO mehrere Wissensfertigkeiten möglich
  public spellcasting: Skill = new Skill('spellcasting', 'Zaubern', 'smarts', this.skillSideEffects); // Nur wenn arkaner Hintergrund(Magie) gewählt wurde

  // TODO remove the ! here
  public equipment!: {
    weapons: [];
    armor: [];
    gear: [];
    money: number;
  };
}
