import React from 'react';

interface MessageFormatterProps {
  message: string;
  isBot: boolean;
}

export default function MessageFormatter({ message, isBot }: MessageFormatterProps) {
  if (!isBot) {
    return <span className="text-sm leading-relaxed">{message}</span>;
  }

  // Function to format bot messages with proper lists and styling
  const formatBotMessage = (text: string) => {
    // Split by lines to process each part
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: 'bullet' | 'numbered' | null = null;

    const finishCurrentList = () => {
      if (currentList.length > 0) {
        if (listType === 'bullet') {
          elements.push(
            <ul key={`list-${elements.length}`} className="list-disc pl-5 mb-2 space-y-1">
              {currentList.map((item, index) => (
                <li key={index} className="text-sm">
                  {formatTextWithBold(item)}
                </li>
              ))}
            </ul>
          );
        } else if (listType === 'numbered') {
          elements.push(
            <ol key={`list-${elements.length}`} className="list-decimal pl-5 mb-2 space-y-1">
              {currentList.map((item, index) => (
                <li key={index} className="text-sm">
                  {formatTextWithBold(item)}
                </li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        finishCurrentList();
        if (elements.length > 0) {
          elements.push(<br key={`br-${elements.length}`} />);
        }
        return;
      }

      // Check for bullet points (*, -, •)
      if (trimmedLine.match(/^[\*\-\•]\s+(.+)/)) {
        if (listType !== 'bullet') {
          finishCurrentList();
          listType = 'bullet';
        }
        const content = trimmedLine.replace(/^[\*\-\•]\s+/, '');
        currentList.push(content);
        return;
      }

      // Check for numbered lists
      if (trimmedLine.match(/^\d+\.\s+(.+)/)) {
        if (listType !== 'numbered') {
          finishCurrentList();
          listType = 'numbered';
        }
        const content = trimmedLine.replace(/^\d+\.\s+/, '');
        currentList.push(content);
        return;
      }

      // Regular text - finish any current list first
      finishCurrentList();
      
      if (trimmedLine) {
        elements.push(
          <p key={`text-${elements.length}`} className="text-sm leading-relaxed mb-2">
            {formatTextWithBold(trimmedLine)}
          </p>
        );
      }
    });

    // Finish any remaining list
    finishCurrentList();

    return elements;
  };

  // Function to add bold formatting to key terms
  const formatTextWithBold = (text: string) => {
    // Bold project names, company names, and technical terms
    const boldPatterns = [
      /(\b[A-Z][a-zA-Z\s]*(?:App|Application|Dashboard|Game|Search|Prediction|System)\b)/g,
      /(\bSyneriq Global\b|\bSmartInternz\b|\bNext24tech\b|\bSiddhartha Institute\b)/g,
      /(\bMachine Learning\b|\bReact\.?js\b|\bPython\b|\bJavaScript\b|\bNode\.?js\b|\bHTML5?\b|\bCSS3?\b|\bMongoDB\b|\bMySQL\b)/gi,
      /(\bB\.?Tech\b|\bAssociate Software Engineer\b|\bFull Stack Developer\b)/gi
    ];

    let formattedText = text;
    
    boldPatterns.forEach(pattern => {
      formattedText = formattedText.replace(pattern, '<strong>$1</strong>');
    });

    // Return JSX with dangerouslySetInnerHTML for bold formatting
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const formattedContent = formatBotMessage(message);

  return (
    <div className="text-sm leading-relaxed">
      {formattedContent}
    </div>
  );
}