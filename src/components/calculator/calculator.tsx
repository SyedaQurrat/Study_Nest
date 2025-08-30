'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleButtonClick = (value: string) => {
    if (hasCalculated && !isOperator(value)) {
      setDisplay(value);
      setExpression(value);
      setHasCalculated(false);
      return;
    }
    
    setHasCalculated(false);

    if (isOperator(value)) {
      if (expression.slice(-1) === ' ' || expression === '') return;
      setDisplay(display + value);
      setExpression(expression + value);
    } else { // Is a number
      if (display === '0' || isOperator(display.slice(-1))) {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
       setExpression(expression + value);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setHasCalculated(false);
  };
  
  const handleBackspace = () => {
    if (hasCalculated) return;
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    setExpression(prev => prev.length > 0 ? prev.slice(0, -1) : '');
  };

  const handleEquals = () => {
    if (expression === '' || isOperator(expression.slice(-1))) return;
    try {
      const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
      // Using new Function is safer than eval
      const result = new Function('return ' + sanitizedExpression)();
      const formattedResult = parseFloat(result.toPrecision(12));
      setDisplay(String(formattedResult));
      setExpression(String(formattedResult));
      setHasCalculated(true);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };
  
  const isOperator = (value: string) => {
    return ['+', '-', '*', '/'].includes(value);
  }

  const buttons = [
    'C', 'CE', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];
  
  const getAction = (btn: string) => {
    if (btn === 'C') return handleClear;
    if (btn === '=') return handleEquals;
    if (btn === 'CE') return handleBackspace;
    if (btn === '%') return () => handleButtonClick('/100');
    return () => handleButtonClick(btn);
  };
  
  const getVariant = (btn: string): "default" | "secondary" | "destructive" | "outline" => {
    if (isOperator(btn) || btn === '=') return 'default';
    if (btn === 'C' || btn === 'CE') return 'destructive';
    return 'secondary';
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-muted p-4 text-right text-4xl font-mono break-all">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={getAction(btn)}
            className={`h-16 text-2xl ${btn === '0' ? 'col-span-2' : ''}`}
            variant={getVariant(btn)}
          >
            {btn === 'CE' ? '⌫' : btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
