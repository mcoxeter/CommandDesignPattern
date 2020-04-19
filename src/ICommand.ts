export interface ICommand {
  execute(): void;
  canExecute(): boolean;
  undo(): void;
}
