
import fs from 'fs';
import path from 'path';

const copyPathInfes = [
    {
        sourceFilePath: './test/asset',
        objectFilePath: './debug/test/asset'
    }];

for (let copyPathInfo of copyPathInfes)
{
    copyFildDirectoryFrom(
        copyPathInfo.sourceFilePath,
        copyPathInfo.objectFilePath);
}

// 复制文件夹
function copyFildDirectoryFrom (srcDir, destDir) 
{
    // 创建目标文件夹
    fs.mkdirSync(destDir, { recursive: true });

    // 读取源文件夹中的所有文件和子文件夹
    const files = fs.readdirSync(srcDir);

    // 遍历所有文件和文件夹
    for (const file of files)
    {
        // 组合文件/文件夹的完整路径
        const filePath = path.join(srcDir, file);
        const destFilePath = path.join(destDir, file);

        // 如果是文件夹，递归复制该文件夹
        if (fs.statSync(filePath).isDirectory())
        {
            copyDir(filePath, destFilePath);
        }
        // 如果是文件，直接复制该文件
        else
        {
            fs.copyFileSync(filePath, destFilePath);
        }
    }
}  