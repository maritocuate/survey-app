import type { NextApiRequest, NextApiResponse } from 'next'

type IQuestion = {
  question: string,
  answers: string[]
}

type ISurvey = {
  survey: IQuestion[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISurvey>
) {
  res.status(200).json({ 
    survey: [
      {
      question: 'What language(s) are you currently using?',
      answers: ['Javascript', 'Python']
    },
    {
      question: 'What country do you currently live in?',
      answers: ['Argentina', 'Brazil']
    }
  ]
  })
}
