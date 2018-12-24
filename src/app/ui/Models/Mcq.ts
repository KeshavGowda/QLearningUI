
export class Mcq {
	constructor(
    public _id: string,
    public question_id: number,
    public question: string,
    public options: string[],
    public answer : string) { }
}
