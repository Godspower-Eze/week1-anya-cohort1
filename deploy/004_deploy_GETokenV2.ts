import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGETokenV2: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const geTokenV2 = await deploy("GETokenV2", {
    from: deployer,
    log: true,
  });
  await execute(
    "GETokenV2",
    { from: deployer },
    "initialize",
    "Godspower Eze Token",
    "GET"
  );
  const proxy = await deployments.get("TransparentProxy");
  await execute(
    "TransparentProxyAdmin",
    { from: deployer },
    "upgrade",
    proxy.address,
    geTokenV2.address
  );
};
export default deployGETokenV2;
deployGETokenV2.tags = ["GETokenV2"];
