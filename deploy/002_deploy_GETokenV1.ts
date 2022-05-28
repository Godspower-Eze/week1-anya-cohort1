import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGETokenV1: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("GETokenV1", {
    from: deployer,
    log: true,
  });
  await execute(
    "GETokenV1",
    { from: deployer },
    "initialize",
    "Godspower Eze Token",
    "GET"
  );
};
export default deployGETokenV1;
deployGETokenV1.tags = ["GETokenV1"];
