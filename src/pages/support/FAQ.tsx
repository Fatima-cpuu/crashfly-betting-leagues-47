
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "What is the Aviator game?",
      answer: "Aviator is an engaging multiplayer crash game with a growing multiplier. Watch as the airplane takes off and the multiplier increases. Cash out before the plane flies away to secure your winnings."
    },
    {
      question: "How do I play Aviator?",
      answer: "Place a bet and watch as the multiplier increases. Cash out before the airplane flies away to win your bet multiplied by the value at which you cashed out. If you don't cash out in time, you lose your bet."
    },
    {
      question: "What is Auto Cash Out?",
      answer: "Auto Cash Out allows you to set a multiplier value at which your bet will be automatically cashed out. This feature ensures you don't miss your desired cash out point."
    },
    {
      question: "Can I place multiple bets in one round?",
      answer: "Yes, you can place up to 2 independent bets per round. Each bet can have its own Auto Cash Out setting or be manually cashed out at different multipliers."
    },
    {
      question: "Is Aviator fair?",
      answer: "Yes, Aviator uses a provably fair algorithm that ensures the outcome of each round cannot be manipulated or predicted. Each round's result is determined before it starts."
    },
    {
      question: "What is the maximum multiplier?",
      answer: "Theoretically, there is no maximum multiplier. However, most rounds end with multipliers between 1.00x and 10.00x. Occasionally, multipliers can reach 100x or even 1000x."
    },
    {
      question: "What happens if my internet connection drops during a game?",
      answer: "If you've set an Auto Cash Out value and your connection drops, the system will still cash out automatically at your specified multiplier. If not, your bet will be lost if the plane flies away."
    },
    {
      question: "How do I check previous round results?",
      answer: "Previous round results are displayed at the top of the game interface. You can see the multipliers from recent rounds to analyze patterns."
    },
    {
      question: "What is Auto Bet?",
      answer: "Auto Bet allows you to automatically place bets for multiple rounds without having to manually place each bet. You can set parameters like bet amount and Auto Cash Out value."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team via Telegram (@AviatorCustomerCare) or email (ellenstones54@gmail.com) for any questions or issues."
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
