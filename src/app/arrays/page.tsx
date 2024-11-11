"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Minus, Scissors, Edit2 } from "lucide-react";

type ArrayItem = {
  value: string;
  type: "number" | "string" | "boolean" | "null" | "undefined";
};

export default function ArrayExplorer() {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [spliceIndex, setSpliceIndex] = useState(0);
  const [spliceCount, setSpliceCount] = useState(0);
  const [info, setInfo] = useState("");
  const [variableName, setVariableName] = useState("myArray");
  const [isEditingName, setIsEditingName] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getDataType = (value: string): ArrayItem["type"] => {
    if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
      return "boolean";
    if (value === "null") return "null";
    if (value === "undefined") return "undefined";
    if (!isNaN(Number(value))) return "number";
    return "string";
  };

  // const evaluateExpression = (
  //   input: string
  // ): { value: any; type: ArrayItem["type"] } => {
  //   try {
  //     // Remove outer quotes if present
  //     const trimmedInput = input
  //       .trim()
  //       .replace(/^["'](.+(?=["']$))["']$/, "$1");

  //     // Check if it's a simple number
  //     if (!isNaN(Number(trimmedInput)) && !isNaN(parseFloat(trimmedInput))) {
  //       return { value: Number(trimmedInput), type: "number" };
  //     }

  //     // Check if it's a simple string (no operators)
  //     if (!/[+\-*/%<>=!&|^]/.test(trimmedInput)) {
  //       return { value: trimmedInput, type: "string" };
  //     }

  //     // Evaluate the expression
  //     const result = eval(trimmedInput);
  //     return { value: result, type: getDataType(result) };
  //   } catch (error) {
  //     // If evaluation fails, treat it as a string
  //     return { value: input, type: "string" };
  //   }
  // };

  const handlePush = () => {
    if (inputValue) {
      const value = inputValue;
      const type = getDataType(inputValue);

      const newItem: ArrayItem = {
        value,
        type,
      };
      setArray([...array, newItem]);
      setInputValue("");
      setInfo(
        "push() adds one or more elements to the end of an array and returns the new length of the array."
      );
    }
  };

  const handlePop = () => {
    if (array.length > 0) {
      const newArray = [...array];
      const poppedElement = newArray.pop();
      setArray(newArray);
      setInfo(
        `pop() removes the last element from an array and returns that element. The removed element was: ${poppedElement?.value}`
      );
    }
  };

  const handleSplice = () => {
    const newArray = [...array];
    const removedElements = newArray.splice(spliceIndex, spliceCount, {
      value: inputValue,
      type: getDataType(inputValue),
    });
    setArray(newArray);
    setInfo(
      `splice() changes the contents of an array by removing or replacing existing elements and/or adding new elements. Removed elements: ${removedElements
        .map((el) => el.value)
        .join(", ")}`
    );
    setInputValue("");
  };

  const handleAccess = (index: number) => {
    if (index >= 0 && index < array.length) {
      const accessNotation =
        index === array.length - 1
          ? `${variableName}[${variableName}.length - 1]`
          : `${variableName}[${index}]`;
      setInfo(
        `Accessed element: ${accessNotation} which is equal to ${array[index].value}. 💡 Remember in JavaScript, array indices start at 0.`
      );
    } else {
      setInfo(
        "Invalid index! Remember, array indices start at 0 and go up to array.length - 1."
      );
    }
  };

  const toggleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariableName(e.target.value);
  };

  const getTypeColor = (type: ArrayItem["type"]): string => {
    switch (type) {
      case "number":
        return "text-blue-600";
      case "string":
        return "text-green-600";
      case "boolean":
        return "text-purple-600";
      case "null":
        return "text-red-600";
      case "undefined":
        return "text-gray-600";
      default:
        return "text-black";
    }
  };

  return (
    <div className="container mx-auto min-h-screen  flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">
            Array Explorer
          </h1>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-purple-600 mr-2">
                {isEditingName ? (
                  <Input
                    type="text"
                    value={variableName}
                    onChange={handleNameChange}
                    className="w-40 inline-block"
                    onBlur={toggleNameEdit}
                    autoFocus
                  />
                ) : (
                  <code className="bg-gray-200 px-2 py-1 rounded">
                    var {variableName} =
                  </code>
                )}
              </h2>
              <Button variant="ghost" size="sm" onClick={toggleNameEdit}>
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit variable name</span>
              </Button>
            </div>
            <div className="flex justify-center items-center min-h-[100px] bg-gray-100 rounded-lg p-4 relative">
              <span className="text-4xl text-gray-400 absolute left-4">[</span>
              <div className="flex flex-wrap gap-4 justify-center items-end mx-8">
                <AnimatePresence>
                  {array.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div
                              className={`text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(
                                item.type
                              )}`}
                              onClick={() => handleAccess(index)}
                            >
                              {item.type === "string" &&
                              item.value !== "null" &&
                              item.value !== "undefined"
                                ? `"${item.value}"`
                                : item.value}
                              {index < array.length - 1 && (
                                <span className="text-gray-400">,</span>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Click to access this element (Type: {item.type})
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="text-sm text-gray-500 mt-1">{index}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <span className="text-4xl text-gray-400 absolute right-4">]</span>
            </div>
            <p className="text-center mt-2 text-purple-700">
              Array length: {array.length}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a value"
                className="mb-2"
              />
              <Button
                onClick={handlePush}
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="mr-2 h-4 w-4" /> Push
              </Button>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handlePop}
                className="bg-red-500 hover:bg-red-600 w-full"
              >
                <Minus className="mr-2 h-4 w-4" /> Pop
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <Input
              type="number"
              placeholder="Splice index"
              onChange={(e) => setSpliceIndex(parseInt(e.target.value))}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Delete count"
              onChange={(e) => setSpliceCount(parseInt(e.target.value))}
              className="w-full"
            />
            <Button
              onClick={handleSplice}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Scissors className="mr-2 h-4 w-4" /> Splice
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-purple-700">
              Information:
            </h3>
            <p className="text-gray-700">{info}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
