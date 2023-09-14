import { RelayNumber } from 'src/generics/enums/relay-number';

export class Relay {
  relayNumber: RelayNumber;
  available: boolean;
  constructor() {
    this.available = true;
  }
}
