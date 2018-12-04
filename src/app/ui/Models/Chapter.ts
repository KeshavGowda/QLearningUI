export class Chapter {
  public _id:string;
  public chapter_id:number;
  public chapter_name:string;

  constructor() {}

  public static fromJson(chapterJson:any):Chapter {
    var chapter = new Chapter();
    chapter._id = chapterJson._id;
    chapter.chapter_id = chapterJson.chapter_id;
    chapter.chapter_name = chapterJson.chapter_name;
    return chapter;
  }
}
