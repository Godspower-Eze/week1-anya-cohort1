import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployProxy: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const geTokenV1 = await deployments.get("GETokenV1");
  const proxyAdmin = await deployments.get("TransparentProxyAdmin");
  await deploy("TransparentProxy", {
    from: deployer,
    args: [geTokenV1.address, proxyAdmin.address],
    log: true,
  });
};
export default deployProxy;
deployProxy.tags = ["TransparentProxy"];
