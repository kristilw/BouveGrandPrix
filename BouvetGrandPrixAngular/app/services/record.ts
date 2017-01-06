export class Record {
    constructor(
        public time: number,
        public name: string,
        public email: string,
        public company: string) { }

    public toString(): string {
        return "Name: " + this.name + ", email: " + this.email + ", company: " + this.company + ", time: " + this.time;
    }
}