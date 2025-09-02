export interface DropdownData {
  dropdownName: string;
  options: string[];
}

export interface ModuleWithDropdowns {
  moduleName?: string;
  pipelineName?: string;
  dropdowns: DropdownData[];
}
