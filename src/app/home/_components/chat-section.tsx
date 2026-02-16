import type { UIMessage } from "@ai-sdk/react";
import { ToolUIPart } from "ai";
import {
  Container,
  Paper,
  Box,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { quickPrompts } from "../data";
import { SectionHeading } from "./section-heading";

interface ChatSectionProps {
  messages: UIMessage[];
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (text?: string) => void;
  isLoading: boolean;
}

export function ChatSection({
  messages,
  input,
  setInput,
  handleSubmit,
  isLoading,
}: ChatSectionProps) {
  return (
    <Container
      component="section"
      id="tryit"
      maxWidth="md"
      sx={{ py: 2.5, pb: 10 }}
    >
      <SectionHeading
        title="Ask PhiloSophia"
        subtitle="Try a philosophical question below"
      />

      <Paper
        elevation={0}
        sx={{
          background: "rgba(124,58,237,0.04)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        {/* Messages */}
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts?.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <Message
                        key={`${message.id}-${i}`}
                        from={message.role}
                      >
                        <MessageContent>
                          <MessageResponse>{part.text}</MessageResponse>
                        </MessageContent>
                      </Message>
                    );
                  }
                  if (part.type?.startsWith("tool-")) {
                    const toolPart = part as ToolUIPart;
                    return (
                      <Tool key={`${message.id}-${i}`}>
                        <ToolHeader
                          type={toolPart.type}
                          state={toolPart.state ?? "output-available"}
                          className="cursor-pointer"
                        />
                        <ToolContent>
                          <ToolInput input={toolPart.input ?? {}} />
                          <ToolOutput
                            output={toolPart.output}
                            errorText={toolPart.errorText}
                          />
                        </ToolContent>
                      </Tool>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            <ConversationScrollButton />
          </ConversationContent>
        </Conversation>

        {/* Quick prompts */}
        {messages.length === 0 && (
          <Box
            sx={{
              px: 3,
              pb: 1.5,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {quickPrompts.map((q) => (
              <Chip
                key={q}
                label={q}
                variant="outlined"
                onClick={() => handleSubmit(q)}
                sx={{
                  color: "#a78bfa",
                  borderColor: "rgba(124,58,237,0.3)",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                  "&:hover": {
                    background: "rgba(124,58,237,0.2)",
                    borderColor: "rgba(124,58,237,0.5)",
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Input */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid rgba(124,58,237,0.15)",
            display: "flex",
            gap: 1.2,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Ask a philosophical question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3.5,
                fontFamily: "system-ui, sans-serif",
                fontSize: 14,
                color: "#e2e8f0",
                background: "rgba(10,5,32,0.6)",
                "& fieldset": { borderColor: "rgba(124,58,237,0.2)" },
                "&:hover fieldset": { borderColor: "rgba(124,58,237,0.4)" },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(124,58,237,0.5)",
                },
              },
            }}
          />
          <IconButton
            onClick={() => handleSubmit()}
            disabled={isLoading || !input.trim()}
            sx={{
              background:
                isLoading || !input.trim()
                  ? "rgba(124,58,237,0.2)"
                  : "linear-gradient(135deg, #7c3aed, #6d28d9)",
              color: "#fff",
              borderRadius: 3.5,
              px: 2.5,
              py: 1,
              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9, #5b21b6)",
              },
              "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Box>
      </Paper>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 11,
          color: "#475569",
          mt: 2,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Responses are AI-generated for educational purposes
      </Typography>
    </Container>
  );
}
