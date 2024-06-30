import React from "react";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { actions } from "../data";

function SelectButton({ fetchData }) {
  const [selectedAction, setSelectedAction] = useState("");
  const handleSelectionChange = (e) => {
    setSelectedAction(e.target.value);
    fetchData(selectedAction);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        selectedKeys={selectedAction}
        onChange={handleSelectionChange}
        label="Sélectionnez une action"
        className="max-w-xs"
      >
        {actions.map((action) => (
          <SelectItem key={action.key}>{action.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectButton;
