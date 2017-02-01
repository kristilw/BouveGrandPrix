export class ViewRecord {
    constructor(
        public time: number,
        public name: string,
        public company: string) { }

    public toString(): string {
        return "Name: " + this.name + ", company: " + this.company + ", time: " + this.time;
    }
}