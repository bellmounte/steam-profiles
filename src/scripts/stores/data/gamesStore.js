(function () {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var EventEmitter = require('events').EventEmitter;
	var assign = require('object-assign');

	var CHANGE_EVENT = 'page-change';

	var _cache = [];

	var GameStore = assign({}, EventEmitter.prototype, {
		selectedGame: null,
		emitChange: function () {
			this.emit(CHANGE_EVENT);
		},
		addChangeListener: function (callback) {
			this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function (callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
		getGame: function (appid) {
			return _cache[appid];
		},
		getGames: function () {
			return _cache;
		},
		getSelectedGame: function () {
			return this.selectedGame;
		}
	});

	// TODO: Integrate this with data fetching.
	GameStore.dispatchToken = appDispatcher.register(function(action) {
		if (action.action === 'game-list-item-update') {
			GameStore.selectedGame = action.selectedItem;
			GameStore.emitChange();
		} else if (action.action === 'nav-item-update' && action.type === 'site-nav') {
			GameStore.selectedGame = null;
			GameStore.emitChange();
		}
	});

	module.exports = GameStore;


	// Data Fixture
	var img_base = 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/';

	_cache[233450] = {
		appid: 233450,
		img: img_base + '233450/fe2f32349f62c1a5d6ee48abd87a6232d32724d1.jpg',
		name: 'Prison Architect',
		owners: 1000
	};

	_cache[570] = {
		appid: 570,
		img: img_base + '570/d4f836839254be08d8e9dd333ecc9a01782c26d2.jpg',
		name: 'Dota 2',
		owners: 1000
	};

	_cache[252950] = {
		appid: 252950,
		img: img_base + '252950/58d7334290672887fdd47e25251f291b812c895e.jpg',
		name: 'Rocket League',
		owners: 1000,
		average_completion: 59.8
	};

	// Axiom Verge
	_cache[332200] = {
		appid: 332200,
		img: img_base + '332200/97fb318cd65ab72a7fe8f6fcf9cf6e4ab8f36204.jpg',
		name: 'Axiom Verge',
		owners: 1000,
		average_completion: 59.8,
		achievements: [
			{
				name: 'Xedur',
				defaultvalue: 0,
				displayName: 'Xedur',
				hidden: 0,
				description: 'Defeat the Xedur variant.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/2d04958bc43198f38a7412c1269f3381c0b50767.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/1a7bb27501c01cfa9c7a493ebd023725d0709b19.jpg'
			},{
				name: 'Telal',
				defaultvalue: 0,
				displayName: 'Telal',
				hidden: 0,
				description: 'Defeat the Telal variant.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/6d9fa934c4658f8aff2b6b7e43141897ffdc5978.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/f6231880829eda7fb87c11706b05b057753f99e5.jpg'
			},{
				name: 'Uruku',
				defaultvalue: 0,
				displayName: 'Uruku',
				hidden: 0,
				description: 'Defeat the Uruku variant.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/edcf7f14e46f1b1eb1234eb310c7d1e26cc6c580.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/db11690fde540c3aae677e3ee2e4b86d36e64d0e.jpg'
			},{
				name: 'GirTab',
				defaultvalue: 0,
				displayName: 'Gir-Tab',
				hidden: 0,
				description: 'Defeat the Gir-Tab variant.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/9fad2c3c2b9ba388e2381db4d060afaaa99be607.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/6ec9220510cb203db1c3d1118da1291f205e7b16.jpg'
			},{
				name: 'Hallucination',
				defaultvalue: 0,
				displayName: 'Hallucination',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/ae2f3eeabeaef1a4ee67bd1fed6cffc81faf3c4b.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/62f4649e526c3a53b42c44bd4ac10f8a8a58a09a.jpg'
			},{
				name: 'Clone',
				defaultvalue: 0,
				displayName: 'Clone',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/77973c9c69340e557f35f3ebe64a45379416b949.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/77db52666bdb939c426d25934e70caa2e60dff7a.jpg'
			},{
				name: 'Ukhu',
				defaultvalue: 0,
				displayName: 'Ukhu',
				hidden: 0,
				description: 'Defeat the Ukhu Variant.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/57cab112b9ededb3afd4cf4794c5d6c1f0f08f70.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/569bb9f9a15abd8216280da21d3e662b5b15866e.jpg'
			},{
				name: 'Sentinel',
				defaultvalue: 0,
				displayName: 'Sentinel',
				hidden: 0,
				description: 'Defeat Sentinel.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/3e2d0a82371bcd42556a4bcfb35d64383c3d5b56.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/cbc4a21dc55f042bca25a3347b0bfcf6bc003d91.jpg'
			},{
				name: 'Athetos',
				defaultvalue: 0,
				displayName: 'Athetos',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/d345181963c28bddbf40004f7731413772fecdd5.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/3cef93d86e1b9ceaea22a7606bd30ea9bde1d8ea.jpg'
			},{
				name: 'Items100',
				defaultvalue: 0,
				displayName: '100% Items',
				hidden: 0,
				description: 'Acquire 100% of all weapons, tools, upgrades, and notes.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/0421b63a8a4778dc66919ecf1ded0311ab4bf232.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/a9fd1254e262bd5d7b6827426fea27fb19ecf8e8.jpg'
			},{
				name: 'Map100',
				defaultvalue: 0,
				displayName: '100% Map',
				hidden: 0,
				description: 'Uncover 100% of the game map.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/9986c094c599177fbe0860c3346befd80654ee45.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/d37bac0fabe86c6ede32750f9a1af22e7051de42.jpg'
			},{
				name: 'Overclocked',
				defaultvalue: 0,
				displayName: 'Overclocked',
				hidden: 0,
				description: 'Complete the entire game in under 4 hours.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/d6b74097d4c2975447924f117c379157d621c1f9.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/49be93eae8d296d661df34d11bd43b5b685b3210.jpg'
			},{
				name: 'Weapons100',
				defaultvalue: 0,
				displayName: '100% Weapons',
				hidden: 0,
				description: 'Find 100% of the weapons in the game.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/b436659477351e7bdfc8a7e9ea95c75b0ad1ba67.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/ecbd7128c8dea2839d925c844289a3a1f5014176.jpg'
			},{
				name: 'Tools100',
				defaultvalue: 0,
				displayName: '100% Tools',
				hidden: 0,
				description: 'Find 100% of the tools/abilities in the game.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/af503b5f6f9e886f902e680b93300d2a9e7b8b7a.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/fd1e6b808f0ff73160d5788156652797b17c2b1b.jpg'
			},{
				name: 'Health100',
				defaultvalue: 0,
				displayName: '100% Health',
				hidden: 0,
				description: 'Find 100% of Health Nodes.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/a9806fa66a73bffc70aa078612df40437c8da0c4.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/007686e736d9728eec2e547c633bd203d626d7cd.jpg'
			},{
				name: 'Notes100',
				defaultvalue: 0,
				displayName: '100% Notes',
				hidden: 0,
				description: 'Find 100% of all notes in the game.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/eb8bcd53de09303da474f5ee766794c357b21d23.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/267867576ad67d78f0c681dd8585f62b85903d84.jpg'
			},{
				name: 'MostlyInvincible',
				defaultvalue: 0,
				displayName: 'Mostly Invincible',
				hidden: 0,
				description: 'Complete the game without dying more than once.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/0c82c761bd6e11eb57aff8fe227339c67e240fa9.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/1e799246de4cd6a5c7e02835dceacc9dbdd78db7.jpg'
			},{
				name: 'Speedrunner',
				defaultvalue: 0,
				displayName: 'Speedrunner',
				hidden: 0,
				description: 'Complete the game once in Speedrun Mode.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/41a875b500d0357216c1157e172ae31a006d48e1.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/fdf84eda6d3bcb2e0bb48e2bf11f4310a54cff8d.jpg'
			},{
				name: 'Hard',
				defaultvalue: 0,
				displayName: 'Hard',
				hidden: 0,
				description: 'Complete the game in Hard difficulty.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/62a0c075ae97a24e34888253cefae4c02e89bf9e.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/6d5b3edc45b038f29d76feed04aac07275200050.jpg'
			},{
				name: 'Hack',
				defaultvalue: 0,
				displayName: 'Hack',
				hidden: 0,
				description: 'Glitch your first enemy.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/bf2e7c9e777278a05881a400a731612bb731278e.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/d1c7be0935d53a3a0379d5df45573f51870dd8b9.jpg'
			},{
				name: 'Hacker',
				defaultvalue: 0,
				displayName: 'Hacker',
				hidden: 0,
				description: 'Glitch every enemy type at least once.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/699ea5d9df4a415b168e7b06bdddaadda9eac762.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/ee5199ac9bec6d0cfed11cc89eabe312e0de3fea.jpg'
			},{
				name: 'Power100',
				defaultvalue: 0,
				displayName: '100% Power',
				hidden: 0,
				description: 'Find 100% of all Power Nodes.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/d6421d6144936a703099dde81abd0b9209775730.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/07933fb11f6e0d813a48c00ff995c7d85f7c5c52.jpg'
			},{
				name: 'LowPercent',
				defaultvalue: 0,
				displayName: 'Low %',
				hidden: 0,
				description: 'Complete the game with under 40% of all items.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/03de45a1a1f26dfca35b8be46c708349586eed8e.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/03ab809775721467d809aeaa2b48c0d0f1452842.jpg'
			},{
				name: 'SecretWorld',
				defaultvalue: 0,
				displayName: 'Secret World',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/7ed55289cb8fa144871533327c33626258909631.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/4ba7f9ac43506091167539481005b50af9409857.jpg'
			},{
				name: 'Pacifist',
				defaultvalue: 0,
				displayName: 'Pacifist',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/e3400fad283aae2eebfc533f4802ae85c070bf94.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/29914c885d5489e860e308d2598d405533314f91.jpg'
			},{
				name: 'BubbleBreaker',
				defaultvalue: 0,
				displayName: 'Bubble Breaker',
				hidden: 0,
				description: 'Destroy 2000 regenerating blocks.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/c3cc360bc6e4778a00a0797ddb0560320050ab86.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/e52d8814979bb7348cc41aae6469cef467cd53e5.jpg'
			},{
				name: 'BrickBreaker',
				defaultvalue: 0,
				displayName: 'Brick Breaker',
				hidden: 0,
				description: 'Destroy 2000 bricks.',
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/b3f6c27c75bcd42f8c674b0d77e4ddd290bd18fc.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/0ddb6eef33a3603c883260784c426766077a0d9d.jpg'
			},{
				name: 'Cryptologist',
				defaultvalue: 0,
				displayName: 'Cryptologist',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/a4e0d58d94e9cc462d0384225b57fd0869dd8c98.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/db0c19c60bf30c1b2f507ad3c98f5bede358c0b2.jpg'
			},{
				name: 'Mercy',
				defaultvalue: 0,
				displayName: 'Mercy',
				hidden: 1,
				icon: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/57ade580edf772bdb76f59358666d9921c99a7f7.jpg',
				icongray: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/332200/7d2eac4600f5c54615e05e132ab57c356d1f29f8.jpg'
			}
		]
	};

})();
