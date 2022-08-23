import type { NextApiRequest, NextApiResponse } from 'next'

type IQuestion = {
  name: string,
  elements: any
}

type ISurvey = {
  pages: IQuestion[],
  completedHtml: string,
  completedHtmlOnCondition: any[],
  showQuestionNumbers: string
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<ISurvey>
) {
  res.status(200).json({
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'rating',
            name: 'nps_score',
            title: 'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: '(Most unlikely)',
            maxRateDescription: '(Most likely)'
          }, {
            type: 'checkbox',
            name: 'promoter_features',
            visibleIf: '{nps_score} >= 9',
            title: 'Which of the following features do you value the most?',
            description: 'Please select no more than three features.',
            isRequired: true,
            validators: [
              {
                type: 'answercount',
                text: 'Please select no more than three features.',
                maxCount: 3
              }
            ],
            hasOther: true,
            choices: [
              'Performance',
              'Stability',
              'User interface',
              'Complete functionality',
              'Learning materials (documentation, demos, code examples)',
              'Quality support'
            ],
            otherText: 'Other features:',
            colCount: 2
          }, {
            type: 'comment',
            name: 'passive_experience',
            visibleIf: '{nps_score} >= 7  and {nps_score} <= 8',
            title: 'What can we do to make your experience more satisfying?'
          }, {
            type: 'comment',
            name: 'disappointing_experience',
            visibleIf: '{nps_score} <= 6',
            title: 'Please let us know why you had such a disappointing experience with our product'
          }
        ]
      },
      {
        name: 'page2',
        elements: [
          {
            type: 'dropdown',
            name: 'car',
            title: 'What car are you driving?',
            isRequired: true,
            colCount: 0,
            hasNone: true,
            choices: [
              'Ford',
              'Vauxhall',
              'Volkswagen',
              'Nissan',
              'Audi',
              'Mercedes-Benz',
              'BMW',
              'Peugeot',
              'Toyota',
              'Citroen'
            ]
          }
        ]
      }
    ],
    completedHtml: '<h3>Thank you for your feedback</h3>',
    completedHtmlOnCondition: [
      {
        expression: '{nps_score} >= 9',
        html: '<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>'
      }, {
        expression: '{nps_score} >= 6  and {nps_score} <= 8',
        html: '<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>'
      }
    ],
    showQuestionNumbers: 'off'
  })
}
