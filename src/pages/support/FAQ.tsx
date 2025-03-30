
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does the Aviator game work?",
      answer: "Aviator is a multiplayer game where you bet on a virtual plane that takes off and flies, with a multiplier that increases as it goes higher. The goal is to cash out before the plane flies away, securing your winnings. If you wait too long and the plane flies away before you cash out, you lose your bet."
    },
    {
      question: "What are the minimum and maximum bet amounts?",
      answer: "The minimum bet amount is $1.00 and the maximum bet amount is $100.00 per bet."
    },
    {
      question: "Can I place multiple bets in one round?",
      answer: "Yes, you can place up to two bets simultaneously in each round."
    },
    {
      question: "What is auto cash out?",
      answer: "Auto cash out allows you to set a target multiplier. When the multiplier reaches your set value, the system will automatically cash out for you."
    },
    {
      question: "What is auto betting?",
      answer: "Auto betting allows you to set parameters for automatic bets over multiple rounds. You can configure settings like bet amount, auto cash out multiplier, and stop conditions."
    },
    {
      question: "How are the results determined?",
      answer: "Game results are determined by a provably fair algorithm which ensures that game outcomes are random and cannot be predicted or manipulated."
    },
    {
      question: "How do I deposit funds?",
      answer: "You can deposit funds through various methods including credit/debit cards, e-wallets like PayPal and Skrill, and cryptocurrencies such as Bitcoin and Ethereum."
    },
    {
      question: "How do I withdraw my winnings?",
      answer: "You can withdraw your winnings through bank transfers, e-wallets, or cryptocurrencies. Navigate to the Withdrawal section in the main menu."
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700">
              <AccordionTrigger className="text-lg font-medium py-4">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-300 py-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
