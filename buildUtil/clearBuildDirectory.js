
import fs from 'fs';

const pathsNeedClear = ['./lib/', './lib_test/'];

for (let pathNeedClear of pathsNeedClear)
{
    deleteFildDirectory(pathNeedClear);
}

function deleteFildDirectory (path)
{
    if (fs.existsSync(path))
    {
        const files = fs.readdirSync(path);

        files.forEach(file =>
        {
            const filePath = `${path}/${file}`;

            if (fs.lstatSync(filePath).isDirectory())
            {
                deleteFildDirectory(filePath);
            } 
            else
            {
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(path);
    }
}