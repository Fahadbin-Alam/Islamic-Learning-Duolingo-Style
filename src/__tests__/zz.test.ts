import { COURSE, LESSONS_BY_ID } from "../data/course";
import { pictureForLesson } from "../data/lessonPictures";
import fs from "fs";
test("x", () => {
  const out: string[] = [];
  for (const s of (COURSE as any).sections) for (const n of s.nodes) {
    const l = (LESSONS_BY_ID as any)[n.lessonIds[0]]; if (!l) continue;
    const p = pictureForLesson(l); if (!p) continue;
    out.push(`${p.id}\t${s.topicId}\t${n.branchId}\t${l.title}\t|| ${l.learnLine} || ${(l.learnFacts||[]).join(" / ")}`);
  }
  fs.writeFileSync("/tmp/pics.tsv", out.join("\n"));
});
