"use client";

import { useState, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import type { Philosopher } from "./data";
import { NavBar } from "./_components/nav-bar";
import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { ExploreSection } from "./_components/explore-section";
import { ChatSection } from "./_components/chat-section";
import { Footer } from "./_components/footer";

export default function PhilosophyAI() {
  const [input, setInput] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/philosophia" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 200);

    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/philosophia");
        const data = await res.json();
        setMessages([...data]);
      } catch {
        // Silently handle — fresh chat
      }
    };
    fetchMessages();

    return () => clearTimeout(timer);
  }, [setMessages]);

  const handleSubmit = useCallback(
    (text?: string) => {
      const userMsg = text ?? input;
      if (!userMsg.trim()) return;
      sendMessage({ text: userMsg });
      setInput("");
    },
    [input, sendMessage],
  );

  const handlePhilosopherClick = useCallback(
    (philosopher: Philosopher) => {
      handleSubmit(
        `I'd like to explore the philosophy of ${philosopher.name}. ${philosopher.question}`,
      );
      document.getElementById("tryit")?.scrollIntoView({ behavior: "smooth" });
    },
    [handleSubmit],
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="dark"
        sx={{
          background:
            "linear-gradient(180deg, #030014 0%, #0a0520 40%, #0f0a2e 100%)",
          color: "#e2e8f0",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <HeroSection heroVisible={heroVisible} />
        <FeaturesSection />
        <ExploreSection onPhilosopherClick={handlePhilosopherClick} />
        <ChatSection
          messages={messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
