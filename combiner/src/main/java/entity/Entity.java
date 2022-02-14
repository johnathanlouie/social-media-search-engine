package entity;

import java.util.HashMap;
import java.util.Map;

/**
 * Entity class is an abstract class that can be extended by any class that
 * identifies as a real world object.
 *
 * Uses a HashMap to store and set fields and values of the Entity. This makes
 * an Entity's fields more generic and available for simple necessary operations
 * like store, retrieval, comparison etc. Here the one processing the Entity
 * object doesn't have to know about all or any of the fields of the Entity.
 *
 * @author sashi
 */
public abstract class Entity {

    protected Map<String, Object> fieldValuePair;

    public Entity() {
        fieldValuePair = new HashMap<String, Object>();
    }

    public abstract Entity union(Entity e1, Entity e2);

}
