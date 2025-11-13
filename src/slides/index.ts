import Slide01_Title from './Slide01_Title';
import Slide02_CurrentState from './Slide02_CurrentState';
import Slide03_CurrentModel from './Slide03_CurrentModel';
import Slide04_ProposedModel from './Slide04_ProposedModel';
import Slide05_Ontology from './Slide05_Ontology';
import Slide06_AgentProcess from './Slide06_AgentProcess';
import Slide07_DemoTransition from './Slide07_DemoTransition';
import Slide08_PlatformArchitecture from './Slide08_PlatformArchitecture';
import Slide09_ContentLifecycle from './Slide09_ContentLifecycle';
import Slide10_CallToAction from './Slide10_CallToAction';

export const slides = [
  {
    title: 'Title - Acclaro Platform Evolution',
    component: Slide01_Title,
  },
  {
    title: 'Current State & Value Proposition',
    component: Slide02_CurrentState,
  },
  {
    title: 'Current Business Model',
    component: Slide03_CurrentModel,
  },
  {
    title: 'Proposed Platform Model',
    component: Slide04_ProposedModel,
  },
  {
    title: 'Language Constraint Ontology',
    component: Slide05_Ontology,
  },
  {
    title: 'Agent-Driven Extraction Process',
    component: Slide06_AgentProcess,
  },
  {
    title: 'Platform Architecture',
    component: Slide08_PlatformArchitecture,
  },
  {
    title: 'Content Lifecycle Governance',
    component: Slide09_ContentLifecycle,
  },
  {
    title: 'Call to Action & Next Steps',
    component: Slide10_CallToAction,
  },
  {
    title: 'Interactive Demo - Knowledge Graph',
    component: Slide07_DemoTransition,
  },
];
