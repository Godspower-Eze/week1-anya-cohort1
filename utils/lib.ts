import { deployments } from "hardhat";
import { GETokenV1, GETokenV2, Proxy, ProxyAdmin } from "../typechain";

export const setUpTest = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    await deployments.fixture(); // ensure you start from a fresh deployments
    const GETokenV1: GETokenV1 = await ethers.getContract("GETokenV1");
    const GETokenV2: GETokenV2 = await ethers.getContract("GETokenV2");
    const Proxy: Proxy = await ethers.getContract("TransparentProxy");
    const ProxyAdmin: ProxyAdmin = await ethers.getContract(
      "TransparentProxyAdmin"
    );
    return {
      GETokenV1,
      GETokenV2,
      Proxy,
      ProxyAdmin,
    };
  }
);
