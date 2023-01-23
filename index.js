import {firefox, webkit, chromium} from 'playwright'


(async () => { 
    
 const browser = await firefox.launch({
 headless: false, 
 }); 
 const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
 javaScriptEnabled: true,});
 const tempo = 1000 //{03}

 const page = await context.newPage({              
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
   

})  

await page.goto('http://www.bet365.com/#/H0')
await Login(page, tempo);
// await page.locator('.ovm-HorizontalMarket_Participant.ovm-ParticipantOddsOnly.gl-Participant_General ').nth(0).click();
await PercorreJogos(page, tempo);

await page.pause();
})();

const PercorreJogos = async (_page, _tempo) => {
    const page = await _page; //{14}
    const tempo = await _tempo; //{14}

    
    const dataGames = async () => { //{04}
    await page.waitForTimeout(tempo) 
    let listTeamOne = await page.locator('div > .ovm-Fixture_Container > .ovm-FixtureDetailsTwoWay').allTextContents()//{05}
    return {
    listTeamOne //{06}
    }
    };
    const listaJogos = (await dataGames()); //{07}
    for (let index = 0; index < listaJogos.listTeamOne.length; index++) { //{08}
    await page.waitForTimeout(tempo) 
    await page.locator('div > .ovm-Fixture_Container > .ovm-FixtureDetailsTwoWay').nth(index).click(); //{09}     
    await page.waitForTimeout(tempo) 
    const possuiMinutos = await page.locator('.ipe-GridHeaderTabLink').locator(':nth-match(:text("Minutos"), 1)').isHidden();
    const nomeJogo = await page.locator('.ipe-EventHeader_Fixture ').allInnerTexts();
    console.log(nomeJogo);
    await page.locator('.gl-Participant.gl-Participant_General.gl-Market_General-cn3 ').nth(0).click();
    // if(!possuiMinutos)
    // {
    //     await page.locator('.ipe-GridHeaderTabLink').locator(':nth-match(:text("Minutos"), 1)').click();   
    //     await page.waitForTimeout(tempo) 
    //     const valor = await page.locator('.srb-ParticipantCenteredStackedMarketRow_Handicap>>nth=1').allInnerTexts();
    //     const odd = await page.locator('.srb-ParticipantCenteredStackedMarketRow_Odds>>nth=1').allInnerTexts();
    //     const tempoJogo = await page.locator('.ml1-SoccerClock_Clock ').allInnerTexts();
    //     const escanteioCasa = await page.locator('.ml1-StatsColumnAdvanced_MiniValue ').nth(0).allInnerTexts();
    //     const escanteioFora = await page.locator('.ml1-StatsColumnAdvanced_MiniValue ').nth(3).allInnerTexts();
    //     console.log('jogo' + index);
    //     console.log(tempoJogo);
    //     console.log(escanteioCasa);
    //     console.log(escanteioFora);
    //     console.log(valor[0]);
    //     console.log(odd[0]);
    //     await page.waitForTimeout(1500);
    //     // await page.locator('.srb-ParticipantCenteredStackedMarketRow_Odds').nth(1).click({delay:105});
    //     // await page.locator('.srb-ParticipantCenteredStackedMarketRow.gl-Participant_General.gl-Market_General-cn1.srb-ParticipantCenteredStackedMarketRow-wide.srb-ParticipantCenteredStackedMarketRow-hashandicap ').nth(1).click({delay:105});
    //     await page.waitForTimeout(300);
    //     await page.screenshot({path: 'teste.png'})
        
    // }
    await page.waitForTimeout(tempo) //{10}
    await page.goBack() //{11}
    }
    console.log(`\nTotal: ${listaJogos.listTeamOne.length} games`); //{12}
}

//Realiza Login e configurações gerais
const Login = async (_page, _tempo) => { //{13}
 const page = await _page; //{14}
 const tempo = await _tempo; //{14}
await page.locator('text=Login').nth(1).click();
await page.waitForTimeout(tempo);
await page.getByPlaceholder('Usuário').fill('vini4842');
await page.waitForTimeout(tempo);
await page.getByPlaceholder('Usuário').press('Tab');
await page.waitForTimeout(tempo);
await page.getByPlaceholder('Senha').fill('Copa@1');
// await page.locator('.lms-LoginButton ').click();
await page.keyboard.down('Enter');
await page.waitForTimeout(3000);
await page.locator('text=Fechar').nth(0).click();
await page.locator('text=Aceitar').nth(0).click();
await page.locator('.hm-MainHeaderCentreWide_Link.hm-HeaderMenuItem').nth(1).click();
await page.waitForTimeout(1000);
}
