import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, getNamedAccounts } from "hardhat";
import { GETokenV1 } from "../typechain";
import { setUpTest } from "../utils/lib";

describe("GETokenV1", function () {
  let contract: GETokenV1;

  beforeEach(async function () {
    contract = (await setUpTest()).GETokenV1;
  });

  it("Should return name", async function () {
    const name = await contract.name();
    expect(name).to.be.equal("Godspower Eze Token");
  });

  it("Should return symbol", async function () {
    const name = await contract.symbol();
    expect(name).to.be.equal("GET");
  });

  it("Deployer should be able to mint", async function () {
    const { godspower } = await getNamedAccounts();
    expect((await contract.balanceOf(godspower)).toNumber()).to.be.equal(0);
    const amountToBeMinted = BigNumber.from("1000000");
    await contract.mint(godspower, amountToBeMinted);
    expect((await contract.balanceOf(godspower)).toNumber()).to.be.equal(
      amountToBeMinted.toNumber()
    );
  });

  it("Non-deployer should not be able to mint", async function () {
    const { godspower } = await getNamedAccounts();
    const accounts = await ethers.getUnnamedSigners();
    const amountToBeMinted = BigNumber.from("1000000");
    await expect(
      contract.connect(accounts[0]).mint(godspower, amountToBeMinted)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
