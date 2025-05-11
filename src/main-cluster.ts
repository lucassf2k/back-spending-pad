import cluster from 'node:cluster';
import { ExpressApplication } from './infrastructure/express';

const cpuAvailableCount = 2;

function runPrimaryProcess() {
  console.log(`Numbers of CPUs is ${cpuAvailableCount}`);
  console.log(`Primary ${process.pid} is running...`);
  for (let index = 0; index < cpuAvailableCount; index++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died!`);
    console.log(`Let's fork another worker...`);
    cluster.fork();
  });
}

function runWorkerProcess() {
  console.log(`Ẁorker ${process.pid} started...`);
  ExpressApplication();
}

const main = () =>
  cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();

main();
