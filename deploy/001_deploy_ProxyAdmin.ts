import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployProxyAdmin: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("TransparentProxyAdmin", {
    from: deployer,
    log: true,
  });
};
export default deployProxyAdmin;
deployProxyAdmin.tags = ["TransparentProxyAdmin"];
