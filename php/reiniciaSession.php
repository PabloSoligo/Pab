<?php
session_start();
session_destroy();
session_unset();
session_start();
session_regenerate_id();
session_start();
?>