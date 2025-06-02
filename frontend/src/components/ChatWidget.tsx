// "use client";

// import React, { useEffect, useRef, useState } from "react";

// const ChatWidget: React.FC = () => {
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<
//     {
//       from: "user" | "admin" | "ai";
//       text: string;
//       timestamp?: string;
//     }[]
//   >([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const sessionIdRef = useRef(Math.floor(Math.random() * 1000000));
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   const prevMessagesLengthRef = useRef(messages.length);

//   useEffect(() => {
//     const prevLength = prevMessagesLengthRef.current;
//     const currentLength = messages.length;

//     if (currentLength > prevLength) {
//       chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }

//     prevMessagesLengthRef.current = currentLength;
//   }, [messages]);

//   function formatText(text: string) {
//     const linkified = text.replace(
//       /(https?:\/\/[^\s]+)/g,
//       (url) =>
//         `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#007bff; text-decoration:underline;">${url}</a>`
//     );

//     const withBreaks = linkified.replace(/\. (?=[А-ЯA-Z0-9])/g, ".<br>");

//     return withBreaks;
//   }

//   useEffect(() => {
//     async function fetchMessages() {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/sessions/${sessionIdRef.current}`
//         );
//         const data = await res.json();
//         if (data.messages) {
//           setMessages((prev) => {
//             const existingTexts = new Set(prev.map((m) => m.text));
//             const newMessages = data.messages.filter(
//               (msg: any) => !existingTexts.has(msg.text)
//             );
//             return [...prev, ...newMessages];
//           });
//         }
//       } catch (e) {
//         console.error("Failed to fetch session messages", e);
//       }
//     }

//     fetchMessages();
//     const intervalId = setInterval(fetchMessages, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   async function sendMessage() {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, { from: "user", text: input }]);
//     setInput("");

//     try {
//       setIsLoading(true);
//       const res = await fetch("http://localhost:3000/api/askAssistant", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: input,
//           sessionId: sessionIdRef.current,
//         }),
//       });

//       const data = await res.json();
//       setIsLoading(false);
//       if (data.answer?.trim()) {
//         setMessages((prev) => [...prev, { from: "ai", text: data.answer }]);
//       }
//     } catch (err) {
//       setIsLoading(false);
//       setMessages((prev) => [
//         ...prev,
//         { from: "ai", text: "Помилка звʼязку з сервером." },
//       ]);
//     }
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         style={{
//           position: "fixed",
//           bottom: 20,
//           right: 20,
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//           fontSize: 24,
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//           zIndex: 9999,
//         }}
//       >
//         💬
//       </button>

//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: 90,
//             right: 20,
//             width: 340,
//             height: 480,
//             background: "#f9f9f9",
//             borderRadius: 16,
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
//             zIndex: 9999,
//             fontFamily: "sans-serif",
//             border: "1px solid #ddd",
//           }}
//         >
//           <div
//             style={{
//               flex: 1,
//               padding: "1rem",
//               overflowY: "auto",
//               background: "#fff",
//             }}
//           >
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   justifyContent: m.from === "user" ? "flex-end" : "flex-start",
//                   marginBottom: 10,
//                 }}
//               >
//                 <div
//                   style={{
//                     maxWidth: "80%",
//                     padding: "0.6rem 1rem",
//                     borderRadius: 20,
//                     backgroundColor:
//                       m.from === "user"
//                         ? "#007bff"
//                         : m.from === "admin"
//                         ? "yellow"
//                         : "#e9ecef",
//                     color: m.from === "user" ? "#fff" : "#333",
//                     fontSize: "0.95rem",
//                     whiteSpace: "pre-wrap",
//                     wordBreak: "break-word",
//                     overflowWrap: "anywhere",
//                   }}
//                   dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
//                 />
//               </div>
//             ))}
//             <div ref={chatEndRef} />
//           </div>

//           <div
//             style={{
//               padding: "0.75rem",
//               display: "flex",
//               gap: 8,
//               background: "#f1f1f1",
//               borderTop: "1px solid #ddd",
//             }}
//           >
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") sendMessage();
//               }}
//               placeholder="Напиши запитання..."
//               style={{
//                 flex: 1,
//                 padding: "0.6rem 1rem",
//                 borderRadius: 999,
//                 border: "1px solid #ccc",
//                 background: "#fff",
//                 color: "#333",
//                 outline: "none",
//               }}
//             />
//             <button
//               onClick={sendMessage}
//               style={{
//                 padding: "0.6rem 1rem",
//                 borderRadius: 999,
//                 border: "none",
//                 background: "#007bff",
//                 color: "#fff",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//               disabled={isLoading}
//             >
//               ➤
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatWidget;
