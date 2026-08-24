import { whyReasons } from './home-content';
import { services } from './services';

const directContact = whyReasons.find(({ id }) => id === 'direkter-draht')!;
const evidence = whyReasons.find(
  ({ id }) => id === 'fundierte-beweissicherung',
)!;
const damageAssessment = services.find(({ id }) => id === 'schadengutachten')!;

export const processContent = {
  eyebrow: 'So einfach',
  heading: 'In 3 Schritten zu Ihrem Kfz-Gutachten',
  steps: [
    {
      number: '1',
      title: directContact.title,
      description: directContact.description,
    },
    {
      number: '2',
      title: evidence.title,
      description: evidence.description,
    },
    {
      number: '3',
      title: damageAssessment.title,
      description: damageAssessment.description.split(
        ' War der Unfall unverschuldet',
      )[0],
    },
  ],
} as const;
