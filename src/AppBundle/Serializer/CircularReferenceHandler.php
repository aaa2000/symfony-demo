<?php

namespace AppBundle\Serializer;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        return get_class($object);
    }
}
