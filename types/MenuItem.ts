type MenuItem = {
  label: string;
  to?: string | undefined;
  key: string;
  command?: (() => void) | undefined;
  visible?: boolean | undefined;
};

export default MenuItem;
