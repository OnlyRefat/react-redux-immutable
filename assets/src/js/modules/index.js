import { List, Map } from 'immutable';
import { findIndex } from 'underscore';
const initialState = Map({
  loading: true,
  allItem: List(),
});
function initial(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const allItem = state.get('allItem');
      const newAllItem = allItem.push(Map({   // Every switch/case must always return either immutable 
        id: action.data.id,          //  or primitive (like in activeFilter) state data  
        text: action.data.value,      //  We let Immutable decide if data has changed or not
        isCompleted: false,
      }));
      return state.set('allItem', newAllItem);
    case 'EDIT_ITEM':
      const editAllItem = state.get('allItem');
      let finalIndex = null;
      editAllItem.forEach((singleItem, index) => {
        if (singleItem.get('id') === action.data.id) {
          finalIndex = index;
        }
      });
      const list = editAllItem.update(finalIndex, function(v) {
        return Map({ id: v.get('id'), text: action.data.value, isCompleted: false });
      });
      return state.set('allItem', list);
    default: {
      return state;
    }
  }
}

export {
  initial,
  };



