<?php

namespace App\Enums;

enum PaperworkStatus: string
{
    case OPEN = 'open';
    case WORKING = 'working';
    case CLOSED = 'closed';
}
