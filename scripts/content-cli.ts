import {
  createDraft,
  setStatus,
  inspectDeletion,
  deleteEntry,
} from "./content-maintenance";

const [command, id, ...rest] = process.argv.slice(2);
try {
  if (!command || command === "help") {
    console.info(
      "内容维护：\n  npm run content -- new <id>\n  npm run content -- publish <id>\n  npm run content -- draft <id>\n  npm run content -- archive <id> <本站归档原因>\n  npm run content -- check-delete <id>\n  npm run content -- delete <id>\n编辑 content/benchmarks/<id>.json 后运行 npm run build。共享附件不会被删除命令自动清除。",
    );
  } else {
    if (!id) throw new Error("缺少评测 ID");
    const root = process.cwd();
    switch (command) {
      case "new":
        console.info(await createDraft(root, id));
        break;
      case "publish":
        await setStatus(root, id, "published");
        break;
      case "draft":
        await setStatus(root, id, "draft");
        break;
      case "archive":
        await setStatus(root, id, "archived", rest.join(" "));
        break;
      case "check-delete":
        console.info(JSON.stringify(await inspectDeletion(root, id), null, 2));
        break;
      case "delete":
        console.info(JSON.stringify(await deleteEntry(root, id), null, 2));
        break;
      default:
        throw new Error(`未知命令：${command}，使用 npm run content -- help`);
    }
    if (command !== "check-delete")
      console.info(
        "[content] 已保存源文件；执行 npm run build 后更新发布产物。",
      );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
