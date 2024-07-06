import { availableParallelism } from 'node:os';
import Cluster from 'node:cluster';
import { ExpressApplication } from './infrastructure/express';

const cpuAvailableCount = availableParallelism() - 1;

function runPrimaryProcess() {
  console.log(`Numbers of CPUs is ${cpuAvailableCount}`);
  console.log(`Primary ${process.pid} is running...`);
  for (let index = 0; index < cpuAvailableCount; index++) {
    Cluster.fork();
  }
  Cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died!`);
    console.log(`Let's fork another worker...`);
    Cluster.fork();
  });
}

function runWorkerProcess() {
  console.log(`Ẁorker ${process.pid} started...`);
  ExpressApplication();
}

const main = () => Cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();

main();