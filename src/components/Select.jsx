import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { actions } from "../data";

function SelectButton({ fonction }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        selectedKeys={actions.key}
        onChange={fonction}
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
