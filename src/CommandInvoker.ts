import { ICommand } from './ICommand';

export class CommandInvoker {
  private commands: ICommand[] = [];
  public constructor() {}
  public invoke(command: ICommand): void {
    if (command.canExecute()) {
      this.commands.push(command);
      command.execute();
    }
  }

  public undoAll(): void {
    while (this.commands.length > 0) {
      this.commands.pop().undo();
    }
  }

  public undoLast(): boolean {
    if (this.commands.length === 0) return false;
    this.commands.pop().undo();
    return true;
  }
}
