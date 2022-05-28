import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { GETokenV2 } from "../typechain";
import { setUpTest } from "../utils/lib";

describe("GETokenV2", function () {
  let contract: GETokenV2;

  beforeEach(async function () {
    contract = (await setUpTest()).GETokenV2;
  });

  it("Should be able to burn", async function () {
    const { godspower } = await getNamedAccounts();
    expect((await contract.balanceOf(godspower)).toNumber()).to.be.equal(0);
    const amountToBeMinted = BigNumber.from("1000000");
    await contract.mint(godspower, amountToBeMinted);
    expect((await contract.balanceOf(godspower)).toNumber()).to.be.equal(
      amountToBeMinted.toNumber()
    );
    const godspowerAsSigner = (await ethers.getNamedSigners()).godspower;
    await contract.connect(godspowerAsSigner).burn(godspower, amountToBeMinted);
    expect((await contract.balanceOf(godspower)).toNumber()).to.be.equal(0);
  });
});
