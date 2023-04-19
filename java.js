var characterData = [];

function LoadSheet() {
  var file =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvL3erCqX_mrIDJrMTtcrJ7Y6mBsBgYYLfze60Ce-7OAjkEELIUeZHjpiK6Y9t8IeH92ju81RvIaOc/pub?gid=0&single=true&output=csv";

  Papa.parse(file, {
    download: true,
    header: true,
    complete: function (results) {
      characterData = results.data;
      PopulateData(characterData);
    }
  });
}

function PopulateData(data) {
  var playerList;
  var uniquePlayers = [];
  for (var i = 0; i < data.length; i++) {
    if (!uniquePlayers.includes(data[i].PlayerName))
    {
      uniquePlayers.push(data[i].PlayerName);
      playerList += '<option>' + data[i].PlayerName + '</option>';
    } 
  } 
  document.getElementById("players").innerHTML = playerList;
  LoadPlayer();
}

function LoadPlayer() {
  var selectedPlayer = document.getElementById("playerSelect").value;
  var playerCharacters;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].PlayerName == selectedPlayer)
    {
      playerCharacters += '<option>' + characterData[i].CharacterName + '</option>';
    } 
  }
  document.getElementById("characters").innerHTML = playerCharacters;
  LoadCharacter();
}

function LoadCharacter() {
  SetLevel();
  UpdateAbilityScores();
  UpdateSkillProficiency();
  UpdateHP();
  UpdateHitDice();
  LoadGear();
  UpdateAC();
}

function SetLevel() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
      {
        document.getElementById("playerLevel").value = characterData[i].Level;
        SetProficiencyBonus();
        return;
      }
  }
}

function SetProficiencyBonus() {
  var level = document.getElementById("playerLevel").value;
  document.getElementById("profBonus").value = Math.floor(2 + ((level-1)/4));
}

function UpdateAbilityScores() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
    {
      document.getElementById("strScore").value = characterData[i].STR;
      document.getElementById("dexScore").value = characterData[i].DEX;
      document.getElementById("conScore").value = characterData[i].CON;
      document.getElementById("intScore").value = characterData[i].INT;
      document.getElementById("wisScore").value = characterData[i].WIS;
      document.getElementById("chaScore").value = characterData[i].CHA;
      UpdateModifiers();
      return;
    } 
  }
}

function UpdateModifiers() {
  var strScore = document.getElementById("strScore").value;
  document.getElementById("strMod").value = Math.floor((strScore - 10)/2);
  var dexScore = document.getElementById("dexScore").value;
  document.getElementById("dexMod").value = Math.floor((dexScore - 10)/2);
  var conScore = document.getElementById("conScore").value;
  document.getElementById("conMod").value = Math.floor((conScore - 10)/2);
  var intScore = document.getElementById("intScore").value;
  document.getElementById("intMod").value = Math.floor((intScore - 10)/2);
  var wisScore = document.getElementById("wisScore").value;
  document.getElementById("wisMod").value = Math.floor((wisScore - 10)/2);
  var chaScore = document.getElementById("chaScore").value;
  document.getElementById("chaMod").value = Math.floor((chaScore - 10)/2);
  SetSkills();
  UpdateAC();
}

function UpdateSkillProficiency() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
    {
      document.getElementById("acroProf").checked = IsTrue(characterData[i].Acrobatics); 
      document.getElementById("engiProf").checked = IsTrue(characterData[i].Engineering);
      document.getElementById("forceProf").checked = IsTrue(characterData[i].Force);
      document.getElementById("athlProf").checked = IsTrue(characterData[i].Athletics);
      document.getElementById("decProf").checked = IsTrue(characterData[i].Deception);
      document.getElementById("loreProf").checked = IsTrue(characterData[i].Lore);
      document.getElementById("insProf").checked = IsTrue(characterData[i].Insight);
      document.getElementById("intiProf").checked = IsTrue(characterData[i].Intimidation);
      document.getElementById("invProf").checked = IsTrue(characterData[i].Investigation);
      document.getElementById("medProf").checked = IsTrue(characterData[i].Medicine);
      document.getElementById("sliProf").checked = IsTrue(characterData[i].Slicing);
      document.getElementById("percProf").checked = IsTrue(characterData[i].Perception);
      document.getElementById("perfProf").checked = IsTrue(characterData[i].Performance);
      document.getElementById("persProf").checked = IsTrue(characterData[i].Persuasion);
      document.getElementById("craProf").checked = IsTrue(characterData[i].Crafting);
      document.getElementById("sleiProf").checked = IsTrue(characterData[i].SleightOfHand);
      document.getElementById("steProf").checked = IsTrue(characterData[i].Stealth);
      document.getElementById("survProf").checked = IsTrue(characterData[i].Survival);
      SetSkills();
      return;
    } 
  }
}

function UpdateHP() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
    {
      document.getElementById("maxHP").value = characterData[i].MaxHP;
      document.getElementById("currentHP").value = characterData[i].HP;
    }
  }
}

function UpdateHitDice() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
    {
      document.getElementById("hitDice").value = characterData[i].HitDice;
      document.getElementById("hitDie").value = characterData[i].HitDie;
    }
  }
}

function LoadGear() {
  var selectedCharacter = document.getElementById("characterSelect").value;
  for (var i = 0; i < characterData.length; i++) {
    if (characterData[i].CharacterName == selectedCharacter)
    {
      document.getElementById("equippedArmor").value = characterData[i].Armor;
      document.getElementById("equippedShield").value = characterData[i].Shield;
    }
  }
}

function UpdateAC() {
  var armor = document.getElementById("equippedArmor").value;
  if (armor == 'robes') {
    document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 11;
  } else if (armor == 'leather') {
    document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 11;
  } else if (armor == 'reinforced') {
    document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 12;
  } else if (armor == 'tactical') {
    var tempArmor = parseInt(document.getElementById("dexMod").value) + 12;
    if (tempArmor > 14) {
       document.getElementById("armorClass").value = 14;
    } else {
     document.getElementById("armorClass").value = tempArmor; 
    }
  } else if (armor == 'vest') {
    var tempArmor = parseInt(document.getElementById("dexMod").value) + 13;
    if (tempArmor > 15) {
       document.getElementById("armorClass").value = 15;
    } else {
     document.getElementById("armorClass").value = tempArmor; 
    }
  } else if (armor == 'beskweave') {
    var tempArmor = parseInt(document.getElementById("dexMod").value) + 14;
    if (tempArmor > 16) {
       document.getElementById("armorClass").value = 16;
    } else {
     document.getElementById("armorClass").value = tempArmor; 
    }
  } else if (armor == 'armleather') {
    var tempArmor = parseInt(document.getElementById("dexMod").value) + 14;
    if (tempArmor > 16) {
       document.getElementById("armorClass").value = 16;
    } else {
     document.getElementById("armorClass").value = tempArmor; 
    }
  } else if (armor == 'plastoid') {
    var tempArmor = parseInt(document.getElementById("dexMod").value) + 15;
    if (tempArmor > 17) {
       document.getElementById("armorClass").value = 17;
    } else {
     document.getElementById("armorClass").value = tempArmor; 
    }
  } else if (armor == 'trooper') {
    document.getElementById("armorClass").value = 14;
  } else if (armor == 'armrobe') {
    document.getElementById("armorClass").value = 16;
  } else if (armor == 'beskar') {
    document.getElementById("armorClass").value = 17;
  } else if (armor == 'specop') {
    document.getElementById("armorClass").value = 18;
  } else {
    document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 10;
  }
  if (document.getElementById("equippedShield").value == 'shield') {
    document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 2;
  } else {
    document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value);
  }
}

function SetSkills() {
   var profBonus = parseInt(document.getElementById("profBonus").value);
   var strMod = parseInt(document.getElementById("strMod").value);
   var dexMod = parseInt(document.getElementById("dexMod").value);
   var conMod = parseInt(document.getElementById("conMod").value);
   var intMod = parseInt(document.getElementById("intMod").value);
   var wisMod = parseInt(document.getElementById("wisMod").value);
   var chaMod = parseInt(document.getElementById("chaMod").value);
  
  if (document.getElementById("acroProf").checked == true) {
    document.getElementById("acroProf").value = true;
    document.getElementById("acroScore").value = dexMod + profBonus;
  } else {
    document.getElementById("acroProf").value = false;
    document.getElementById("acroScore").value = dexMod;
  }
  if (document.getElementById("engiProf").checked == true) {
    document.getElementById("engiProf").value = true;
    document.getElementById("engiScore").value = intMod + profBonus;
  } else {
    document.getElementById("engiProf").value = false;
    document.getElementById("engiScore").value = intMod;
  }
  if (document.getElementById("forceProf").checked == true) {
    document.getElementById("forceProf").value = true;
    document.getElementById("forceScore").value = wisMod + profBonus;
  } else {
    document.getElementById("forceProf").value = false;
    document.getElementById("forceScore").value = wisMod;
  }
  if (document.getElementById("athlProf").checked == true) {
    document.getElementById("athlProf").value = true;
    document.getElementById("athlScore").value = strMod + profBonus;
  } else {
    document.getElementById("athlProf").value = false;
    document.getElementById("athlScore").value = strMod;
  }
  if (document.getElementById("decProf").checked == true) {
    document.getElementById("decProf").value = true;
    document.getElementById("decScore").value = chaMod + profBonus;
  } else {
    document.getElementById("decProf").value = false;
    document.getElementById("decScore").value = chaMod;
  }
  if (document.getElementById("loreProf").checked == true) {
    document.getElementById("loreProf").value = true;
    document.getElementById("loreScore").value = wisMod + profBonus;
  } else {
    document.getElementById("loreProf").value = false;
    document.getElementById("loreScore").value = wisMod;
  }
  if (document.getElementById("insProf").checked == true) {
    document.getElementById("insProf").value = true;
    document.getElementById("insScore").value = wisMod + profBonus;
  } else {
    document.getElementById("insProf").value = false;
    document.getElementById("insScore").value = wisMod;
  }
  if (document.getElementById("intiProf").checked == true) {
    document.getElementById("intiProf").value = true;
    document.getElementById("intiScore").value = chaMod + profBonus;
  } else {
    document.getElementById("intiProf").value = false;
    document.getElementById("intiScore").value = chaMod;
  }
  if (document.getElementById("invProf").checked == true) {
    document.getElementById("invProf").value = true;
    document.getElementById("invScore").value = intMod + profBonus;
  } else {
    document.getElementById("invProf").value = false;
    document.getElementById("invScore").value = intMod;
  }
  if (document.getElementById("medProf").checked == true) {
    document.getElementById("medProf").value = true;
    document.getElementById("medScore").value = wisMod + profBonus;
  } else {
    document.getElementById("medProf").value = false;
    document.getElementById("medScore").value = wisMod;
  }
  if (document.getElementById("sliProf").checked == true) {
    document.getElementById("sliProf").value = true;
    document.getElementById("sliScore").value = intMod + profBonus;
  } else {
    document.getElementById("sliProf").value = false;
    document.getElementById("sliScore").value = intMod;
  }
  if (document.getElementById("percProf").checked == true) {
    document.getElementById("percProf").value = true;
    document.getElementById("percScore").value = wisMod + profBonus;
  } else {
    document.getElementById("percProf").value = false;
    document.getElementById("percScore").value = wisMod;
  }
  if (document.getElementById("perfProf").checked == true) {
    document.getElementById("perfProf").value = true;
    document.getElementById("perfScore").value = chaMod + profBonus;
  } else {
    document.getElementById("perfProf").value = false;
    document.getElementById("perfScore").value = chaMod;
  }
  if (document.getElementById("persProf").checked == true) {
    document.getElementById("persProf").value = true;
    document.getElementById("persScore").value = chaMod + profBonus;
  } else {
    document.getElementById("persProf").value = false;
    document.getElementById("persScore").value = chaMod;
  }
  if (document.getElementById("craProf").checked == true) {
    document.getElementById("craProf").value = true;
    document.getElementById("craScore").value = intMod + profBonus;
  } else {
    document.getElementById("craProf").value = false;
    document.getElementById("craScore").value = intMod;
  }
  if (document.getElementById("sleiProf").checked == true) {
    document.getElementById("sleiProf").value = true;
    document.getElementById("sleiScore").value = dexMod + profBonus;
  } else {
    document.getElementById("sleiProf").value = false;
    document.getElementById("sleiScore").value = dexMod;
  }
  if (document.getElementById("steProf").checked == true) {
    document.getElementById("steProf").value = true;
    document.getElementById("steScore").value = dexMod + profBonus;
  } else {
    document.getElementById("steProf").value = false;
    document.getElementById("steScore").value = dexMod;
  }
  if (document.getElementById("survProf").checked == true) {
    document.getElementById("survProf").value = true;
    document.getElementById("survScore").value = wisMod + profBonus;
  } else {
    document.getElementById("survProf").value = false;
    document.getElementById("survScore").value = wisMod;
  }
  
}

function TakeDamage() {
  var amount = document.getElementById("modHP").value;
  var currentHP = document.getElementById("currentHP").value;
  if ((currentHP - amount) >= 0) {
    document.getElementById("currentHP").value = currentHP - amount;
  } else {
    document.getElementById("currentHP").value = 0;
  }
}

function HealHP() {
  var amount = parseInt(document.getElementById("modHP").value);
  var currentHP = parseInt(document.getElementById("currentHP").value);
  var maxHP = parseInt(document.getElementById("maxHP").value);
  if((currentHP + amount) <= maxHP) {
    document.getElementById("currentHP").value = currentHP + amount;
  } else {
    document.getElementById("currentHP").value = maxHP;
  }
}

function LongRest() {
  ResetHP();
  ResetHitDice();
}

function ShortRest() {
  var currentDice = parseInt(document.getElementById("hitDice").value);
  if (currentDice > 0) {
    var currentHP = parseInt(document.getElementById("currentHP").value);
    var maxHP = parseInt(document.getElementById("maxHP").value);
    var maxDie = parseInt(document.getElementById("hitDie").value);
    var hitDieRoll = Math.floor(Math.random() * Math.floor(maxDie));
    if ((currentHP + hitDieRoll) <= maxHP) {
      document.getElementById("currentHP").value = currentHP + hitDieRoll;
    } else {
      document.getElementById("currentHP").value = maxHP;
    }
    document.getElementById("hitDice").value = currentDice - 1;
  }
}

function ResetHP() {
  document.getElementById("currentHP").value = document.getElementById("maxHP").value;
}

function ResetHitDice() {
  document.getElementById("hitDice").value = document.getElementById("playerLevel").value;
}

function IsTrue(string) {
  if (string.toLowerCase() == 'true') { return true; }
}

function SaveData() {
  var formData = new FormData(document.getElementById("charSheet"));
  fetch('https://script.google.com/macros/s/AKfycbzNqwx053WG_9T498ZeGRouoX5xmqaPbnU7dFitfyiaewzHp8jnlpL7ZOA8KdFlfr3-/exec', 
        {
      method: 'post',
      body: formData,
  })
}

window.onload = LoadSheet();
