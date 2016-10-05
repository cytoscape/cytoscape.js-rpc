let EventEmitter = require('eventemitter3');
let uuid = require('uuid');
let Is = require('./is');
let _ = require('lodash');

class Rpc {
  constructor( cy ){
    this.cy = cy;
    this.events = new EventEmitter();
    this.is = new Is( cy );
  }

  // .run({ name, on, args })
  run( cmd ){
    let cy = this.cy;
    let ret;
    let is = this.is;
    let getEleId = ele => ele.id();

    let serialize = val => {
      if( is.cy( val ) ){
        return { on: 'cy' };
      } else if( is.eles( val ) ){
        return { on: val.map( getEleId ) };
      } else {
        return val; // assume val is a JSON-serialisable obj
      }
    };

    if( cmd.on ){ // single ele id, or array of ids
      let makeSelectorFromId = id => '#' + id;
      let on = _.isArray( cmd.on ) ? cmd.on.map( makeSelectorFromId ).join(', ') : makeSelectorFromId( cmd.on );
      let eles = cy.$( on );
      let deserialize = arg => {
        return arg; // TODO handle special cases like eles.bfs() weight
      };

      ret = eles[ cmd.name ].apply( eles, cmd.args.map( deserialize ) );
    } else { // then on cy
      let deserialize = arg => {
        return arg; // TODO handle special cases like eles.bfs() weight
      };

      ret = eles[ cmd.name ].apply( eles, cmd.args.map( deserialize ) );
    } // TODO handle other objs like layout

    return serialize( ret );
  }
}

module.exports = Rpc;
