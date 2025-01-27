import React from "react";

const FAQs = () => {
  const faqs = [
    { question: "How do I schedule a session?", answer: "Go to the schedule section and book a time slot." },
    { question: "What topics can I ask about?", answer: "Feel free to ask about coding, career guidance, and more!" },
    { question: "Can I leave a session mid-way?", answer: "Yes, but it's better to inform your mentor beforehand." },
    { question: "Are sessions recorded?", answer: "No, sessions are private and not recorded unless explicitly stated." },
    { question: "How do I contact a mentor?", answer: "You can use the live chatroom or schedule a session." },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 p-1 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-purple-600">{faq.question}</p>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
