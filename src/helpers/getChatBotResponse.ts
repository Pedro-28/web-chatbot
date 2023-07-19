export function getChatBotResponse(option: number, name?: string) {
  const chatBotResponses = {
    1: `Hi ${name}! I'm your chatbot assistant. What can I help you?`,
    2: 'Here are some loan options',
    3: 'That\'s great to hear! How can I help you?',
    4: `Sure! I'm here to assist you. Please provide more details about 
    what you're looking for or how I can help you. The more information you 
    can give me, the better I can assist you.`,
    5: 'Goodbye! Have a great day!',
  }

  const response = chatBotResponses[option as keyof typeof chatBotResponses];

  if (!response) {
    return 'Sorry, but I couldn\'t understand your question. Could you please rephrase it?';
  }

  return response;
}

export function getChatBotOptionsResponse() {
  return [
    {
      option: "Do you want to apply for a loan?",
      optionResponse: `If you're interested in applying for a loan, we can assist you with that. 
      Please provide some basic information, such as the loan amount, purpose, and your contact details. 
      Our team will review your application and get back to you as soon as possible. 
      To apply for a loan, please visit our online application form `,
      referenceLink: '/loan-application'
    },
    {
      option: "Loan conditions",
      optionResponse: `Our loan conditions depend on various factors, such as the type of loan, loan amount, 
      repayment term, and your credit history. To provide you with accurate and detailed information, 
      it's best to discuss your specific requirements with one of our loan experts. 
      Please contact our customer service at '12 3456-7890' or visit our website's 
      loan conditions page for general information `,
      referenceLink: '/loan-conditions'
    },
    {
      option: "Help",
      optionResponse: `We're here to assist you with any questions or concerns you may have regarding loans. 
      Whether you need clarification on our loan application process, want to understand our loan conditions, 
      or require assistance with any other aspect, our dedicated support team is ready to help. 
      Please reach out to our customer service at '12 3456-7890' or visit 
      our support page for more information `,
      referenceLink: '/support'
    }
  ];
}
