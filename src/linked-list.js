const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
            this.length++;
        }
        else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
            this.length++;
        }
        return this;
    }

    head() {
        if (this._head != null) return this._head.data;
        return null;
    }

    tail() {
        if (this._tail != null) return this._tail.data;
        return null;
    }

    at(index) {
        if (index < 0 || index >= this.length) return -1;
        let current = this._head;
        let pos = 0;
        while(current) {
            if (pos == index) {
                return current.data;
            }
            pos++;
            current = current.next;
        }
    }

    insertAt(index, data) {
        if (index < 0) this.insertAt(0,data);
        if (index >= this.length) this.append(data);
        let current = this._head;
        let pos = 1;
        let node = new Node(data);
        if(index == 0) {
            this._head.prev = node;
            node.next = this._head;
            this._head = node;
            this.length++;
        } else {
            while(current) {
                current = current.next;
                if(pos == index) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;
                    this.length++;
                    break;
                }
                pos++;
            }
        }
        return this;
    }

    isEmpty() {
        return this.length < 1
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index < 0 || index >= this.length) return false;
        let current = this._head;
        let pos = 0;
        while(current) {
          if( pos == index ) {
            if( current == this._head && current == this._tail ) {
              this._head = null;
              this._tail = null;
            } else if ( current == this._head ) {
              this._head = this._head.next
              this._head.prev = null
            } else if ( current == this._tail ) {
              this._tail = this._tail.prev;
              this._tail.next = null;
            } else {
              current.prev.next = current.next;
              current.next.prev = current.prev;
            }
            break;
         }
         current = current.next
         pos++; 
        }
        this.length--;
        return this;
    }

    reverse() {
        let current = this._head;
        let prev = null;
        while( current ){
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let pos = 0;
        while( current ) {
            if( current.data === data ) {
            return pos
            }
            current = current.next
            pos++
        }
        return -1;
    }
}

module.exports = LinkedList;
