//==========
// UI, Blockly
$(window).load(function(){

	console.log("Loaded!!");

	//==========
	// UI
	
	// Check
	$("#submitCheck").darkTooltip({
		trigger:"click", animation:"flipIn", gravity:"south", confirm:true, theme:"dark", size:"small",
		yes:"Submit", no:"Cancel", onYes: function(){
			console.log("submitCheck!!");
		}
	});

	// Upload
	$("#submitUploadCode").darkTooltip({
		trigger:"click", animation:"flipIn", gravity:"south", confirm:true, theme:"dark", size:"small",
		yes:"Submit", no:"Cancel", onYes: function(){
			console.log("submitUploadCode!!");

			// Code
			var userCode = Blockly.JavaScript.workspaceToCode(workspace);
			console.log("== code ==");
			console.log(userCode);

			// Upload
			uploadUserCode(getUserName(), userCode);
		}
	});

	// Download
	$("#submitDownloadCode").darkTooltip({
		trigger:"click", animation:"flipIn", gravity:"south", confirm:true, theme:"dark", size:"small",
		yes:"Submit", no:"Cancel", onYes: function(){
			console.log("submitDownloadCode!!");

			// Download
			downloadUserCode(getUserName());
		}
	});

	// Launch
	$("#submitLaunchCode").darkTooltip({
		trigger:"click", animation:"flipIn", gravity:"south", confirm:true, theme:"dark", size:"small",
		yes:"Submit", no:"Cancel", onYes: function(){
			console.log("submitLaunchCode!!");

			// Code
			var userCode = Blockly.JavaScript.workspaceToCode(workspace);
			console.log("== code ==");
			console.log(userCode);

			// Send
			statusCode();
		}
	});

	// Run
	$("#submitRunCode").darkTooltip({
		trigger:"click", animation:"flipIn", gravity:"south", confirm:true, theme:"dark", size:"small",
		yes:"Submit", no:"Cancel", onYes: function(){
			console.log("submitRunCode!!");

			// Code
			var userCode = Blockly.JavaScript.workspaceToCode(workspace);
			console.log("== code ==");
			console.log(userCode);

			// Run(Upload and Launch)
			runUserCode(getUserName(), userCode);
		}
	});

	// Show / Hide
	$("#submitRunCode").show();
	$("#submitDummyCode").hide();

	//==========
	// Blockly

	// UserName
	var playerName = getUserName();
	var userName = getUserName();

	// Create
	Blockly.Blocks["player_create"] = {
		init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("ゆうしゃ")
				.appendField(new Blockly.FieldVariable(playerName), "NAME");
			this.setNextStatement(true, "action");
			this.setColour(10);
			this.setTooltip("Create player object");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
			this.setMovable(false);
			this.setEditable(false);
		}
	}

	Blockly.JavaScript["player_create"] = function(block) {
		var name = Blockly.JavaScript.variableDB_.getName(
			block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
		// TODO: Assemble JavaScript into code variable.
		var code = name + ' = createPlayer("' + userName + '");\n';
		return code;
	};

	// DirUp
	Blockly.Blocks["player_dirup"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("上にむく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(120);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_dirup"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.dirUp(moveDone);\n';
		return code;
	};

	// DirDown
	Blockly.Blocks["player_dirdown"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("下にむく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(120);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_dirdown"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.dirDown(moveDone);\n';
		return code;
	};

	// DirDown
	Blockly.Blocks["player_dirleft"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("左にむく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(120);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_dirleft"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.dirLeft(moveDone);\n';
		return code;
	};

	// DirRight
	Blockly.Blocks["player_dirright"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("右にむく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(120);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_dirright"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.dirRight(moveDone);\n';
		return code;
	};

	// MoveUp
	Blockly.Blocks["player_moveup"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("うえにうごく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(210);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_moveup"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.moveUp(moveDone);\n';
		return code;
	};

	// MoveDown
	Blockly.Blocks["player_movedown"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("したにうごく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(210);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_movedown"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.moveDown(moveDone);\n';
		return code;
	};

	// MoveLeft
	Blockly.Blocks["player_moveleft"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("ひだりにうごく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(210);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_moveleft"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.moveLeft(moveDone);\n';
		return code;
	};

	// MoveRight
	Blockly.Blocks["player_moveright"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("みぎにうごく")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(210);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_moveright"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.moveRight(moveDone);\n';
		return code;
	};

	// ActionAttack
	Blockly.Blocks["player_action_attack"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("こうげき")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(60);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_action_attack"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.actionAttack(moveDone);\n';
		return code;
	};

	// ActionMagic
	Blockly.Blocks["player_action_magic"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("まほう")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(60);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_action_magic"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.actionMagic(moveDone);\n';
		return code;
	};

	// ActionGuard
	Blockly.Blocks["player_action_guard"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("ぼうぎょ")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(60);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_action_guard"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.actionGuard(moveDone);\n';
		return code;
	};

	// ActionKnock
	Blockly.Blocks["player_action_knock"] = {
		init: function() {
			this.appendDummyInput()
				.appendField("あける")
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(60);
			this.setTooltip("");
			this.setHelpUrl("http://www.ozateck.sakura.ne.jp");
		}
	};

	Blockly.JavaScript["player_action_knock"] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.actionKnock(moveDone);\n';
		return code;
	};

	// If Then
	Blockly.Blocks['if_then'] = {
		init: function() {
			this.appendValueInput("IF")
				.setCheck("Boolean")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("もし");
			this.appendStatementInput("THEN")
				.setCheck("action")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("なら");
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['if_then'] = function(block) {
		var value_if = Blockly.JavaScript.valueToCode(block, 'IF', Blockly.JavaScript.ORDER_ATOMIC);
		var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.tl.then(function(){\n';
		code += 'if' + value_if + '{\n';
		code += '  console.log("Intercept!!");\n';
		code += '  var length = ' + playerName + '.tl.queue.length;\n';
		code += '  var slice = ' + playerName + '.tl.queue.slice((length-1) * -1);\n';
		code += '  ' + playerName + '.tl.delay(0);\n';// Dummy
		code += statements_then;
		code += '  var lengthAfter = ' + playerName + '.tl.queue.length - length;\n';
		code += '  var sliceAfter = ' + playerName + '.tl.queue.slice(lengthAfter * -1);\n';
		code += '  if(1 < length){// Swap\n';
		code += '    ' + playerName + '.tl.clear();\n';
		code += '    for(var i=0; i<sliceAfter.length; i++) ' + playerName + '.tl.add(sliceAfter[i]);\n';
		code += '    for(var i=0; i<slice.length; i++) ' + playerName + '.tl.add(slice[i]);\n';
		code += '  }\n';
		code += '}\n';
		code += '});\n';
		return code;
	};

	// Checktile
	Blockly.Blocks['tile_checktile_up'] = {
		init: function() {
			this.appendValueInput("CHECKTILE")
				.setCheck("type")
				.appendField("うえに");
			this.appendDummyInput()
				.appendField("がある");
			this.setOutput(true, "Boolean");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_checktile_up'] = function(block) {
		var value_checktile = Blockly.JavaScript.valueToCode(block, 'CHECKTILE', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.checkTileUp' + value_checktile;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tile_checktile_down'] = {
		init: function() {
			this.appendValueInput("CHECKTILE")
				.setCheck("type")
				.appendField("したに");
			this.appendDummyInput()
				.appendField("がある");
			this.setOutput(true, "Boolean");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_checktile_down'] = function(block) {
		var value_checktile = Blockly.JavaScript.valueToCode(block, 'CHECKTILE', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.checkTileDown' + value_checktile;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tile_checktile_left'] = {
		init: function() {
			this.appendValueInput("CHECKTILE")
				.setCheck("type")
				.appendField("ひだりに");
			this.appendDummyInput()
				.appendField("がある");
			this.setOutput(true, "Boolean");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_checktile_left'] = function(block) {
		var value_checktile = Blockly.JavaScript.valueToCode(block, 'CHECKTILE', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.checkTileLeft' + value_checktile;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tile_checktile_right'] = {
		init: function() {
			this.appendValueInput("CHECKTILE")
				.setCheck("type")
				.appendField("みぎに");
			this.appendDummyInput()
				.appendField("がある");
			this.setOutput(true, "Boolean");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_checktile_right'] = function(block) {
		var value_checktile = Blockly.JavaScript.valueToCode(block, 'CHECKTILE', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = playerName + '.checkTileRight' + value_checktile;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	// Tile
	Blockly.Blocks['tile_type_road'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("みち");
			this.setOutput(true, "type");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_type_road'] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = '"road"';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tile_type_wall'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("かべ");
			this.setOutput(true, "type");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_type_wall'] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = '"wall"';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tile_type_door'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("とびら");
			this.setOutput(true, "type");
			this.setColour(170);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['tile_type_door'] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = '"door"';
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	// Repeat Do
	Blockly.Blocks['repeat_do'] = {
		init: function() {
			this.appendValueInput("REPEAT")
				.setCheck("Number")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("れんぞくで");
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("かい");
			this.appendStatementInput("DO")
				.setCheck("action")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("じっこうする");
			this.setInputsInline(true);
			this.setPreviousStatement(true, "action");
			this.setNextStatement(true, "action");
			this.setColour(300);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['repeat_do'] = function(block) {
		var value_repeat = Blockly.JavaScript.valueToCode(block, 'REPEAT', Blockly.JavaScript.ORDER_ATOMIC);
		var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
		// TODO: Assemble JavaScript into code variable.
		var code = 'for(var i=0; i<' + value_repeat + '; i++){\n';
		code += statements_do;
		code += '}\n';
		console.log(code);
		return code;
	};

	Blockly.Blocks['repeat_counter'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldNumber(0, 0, 10), "COUNTER");
			this.setInputsInline(true);
			this.setOutput(true, "Number");
			this.setColour(300);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['repeat_counter'] = function(block) {
		var number_counter = block.getFieldValue('COUNTER');
		// TODO: Assemble JavaScript into code variable.
		var code = number_counter;
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

	//==========
	// Workspace
	var workspace = Blockly.inject("blocklyBox",
		{toolbox: document.getElementById("blocklyTool")});
	Blockly.Xml.domToWorkspace(document.getElementById("blocklyDefault"), workspace);
	workspace.addChangeListener(Blockly.Events.disableOrphans);
});