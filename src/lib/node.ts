export default class Node {
  host: string;
  ip: string;

  constructor(host: string, ip: string) {
    this.host = host;
    this.ip = ip;
  }
}
