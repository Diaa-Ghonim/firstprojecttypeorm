/**
 * when you compile ts the command
 * npm run build will watch all files from root package.json
 * also if you add rootDir in tsConfig server folder
 * and if you add allowJs true in tsConfig you can't compile any file
 * until you add all files you want to comiles it under rootDir
 * also if you add file ts beside pachage.json
 * same error will show, so you should takecare about this
 *
 * finally =>
 * there two ways to compile
 * 1 => when you run build, you will define the file that will comile it
 * script build "tsc server/src/index.ts"
 *
 * 2 => add all files that you want to comile it under rootDir
 *  or not define rootDir and leave default dir which will the root beside package.json
 */