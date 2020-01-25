import {getMetadataArgsStorage, ObjectType, RelationOptions} from "../../index.ts";
import {RelationMetadataArgs} from "../../metadata-args/RelationMetadataArgs.ts";

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(typeFunctionOrTarget: string|((type?: any) => ObjectType<T>),
                              options?: RelationOptions): Function;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(typeFunctionOrTarget: string|((type?: any) => ObjectType<T>),
                              inverseSide?: string|((object: T) => any),
                              options?: RelationOptions): Function;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(typeFunctionOrTarget: string|((type?: any) => ObjectType<T>),
                              inverseSideOrOptions?: string|((object: T) => any)|RelationOptions,
                              options?: RelationOptions): Function {

    // normalize parameters
    let inverseSideProperty: string|((object: T) => any);
    if (typeof inverseSideOrOptions === "object") {
        options = <RelationOptions> inverseSideOrOptions;
    } else {
        inverseSideProperty = <string|((object: T) => any)> inverseSideOrOptions;
    }

    return function (object: Object, propertyName: string) {
        if (!options) options = {} as RelationOptions;

        let isLazy = options.lazy === true;

        getMetadataArgsStorage().relations.push({
            target: object.constructor,
            propertyName: propertyName,
            // propertyType: reflectedType,
            relationType: "many-to-many",
            isLazy: isLazy,
            type: typeFunctionOrTarget,
            inverseSideProperty: inverseSideProperty,
            options: options
        } as RelationMetadataArgs);
    };
}
